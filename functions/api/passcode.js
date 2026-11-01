// Cloudflare Pages Function: /api/passcode
// Admin Passcode Manager connected to Cloudflare D1 Database

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-secret"
};

const DEFAULT_PASSCODE = 'Habit@2026';

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function onRequestGet(context) {
  const { env } = context;

  try {
    if (env.DB) {
      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `).run();

      const row = await env.DB.prepare("SELECT value FROM admin_settings WHERE key = 'passcode'").first();
      if (row && row.value) {
        return new Response(JSON.stringify({ passcode: row.value }), {
          status: 200,
          headers: CORS_HEADERS
        });
      }
    }
  } catch (err) {}

  return new Response(JSON.stringify({ passcode: DEFAULT_PASSCODE }), {
    status: 200,
    headers: CORS_HEADERS
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { currentPasscode, newPasscode } = await request.json();
    if (!newPasscode || newPasscode.trim().length < 4) {
      return new Response(JSON.stringify({ error: "Passcode must be at least 4 characters long." }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    if (env.DB) {
      const passRow = await env.DB.prepare("SELECT value FROM admin_settings WHERE key = 'passcode'").first();
      const validPass = passRow?.value || DEFAULT_PASSCODE;
      if (currentPasscode !== validPass && currentPasscode !== DEFAULT_PASSCODE) {
        return new Response(JSON.stringify({ error: "Current passcode is incorrect." }), {
          status: 401,
          headers: CORS_HEADERS
        });
      }

      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `).run();

      await env.DB.prepare(`
        INSERT INTO admin_settings (key, value) VALUES ('passcode', ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `).bind(newPasscode.trim()).run();
    }

    return new Response(JSON.stringify({ success: true, message: "Passcode updated successfully." }), {
      status: 200,
      headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}
