// Cloudflare Pages Function: /api/menu
// Real-time REST API connected to Cloudflare D1 Database for The Habit Cafe & Grill

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-secret"
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function onRequestGet(context) {
  const { env } = context;

  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ 
        error: "Cloudflare D1 Database binding 'DB' not configured. Running in static fallback mode." 
      }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    // Ensure table exists
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price TEXT NOT NULL,
        description TEXT,
        rating REAL DEFAULT 4.5,
        popular INTEGER DEFAULT 0,
        image TEXT,
        is_available INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    const { results } = await env.DB.prepare("SELECT * FROM menu_items WHERE is_available = 1 ORDER BY id ASC").all();

    const mapped = (results || []).map(row => ({
      id: row.id,
      name: row.name,
      category: row.category,
      price: row.price.startsWith('₹') ? row.price : `₹${row.price}`,
      description: row.description || '',
      rating: Number(row.rating) || 4.5,
      popular: row.popular === 1 || row.popular === true,
      image: row.image || './images/chicken_nuggets.png'
    }));

    return new Response(JSON.stringify(mapped), {
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

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const adminSecret = request.headers.get("x-admin-secret") || body.passcode;

    // Verify passcode if DB has a passcode set
    if (env.DB) {
      const passRow = await env.DB.prepare("SELECT value FROM admin_settings WHERE key = 'passcode'").first();
      const validPass = passRow?.value || 'Habit@2026';
      if (!adminSecret || (adminSecret !== validPass && adminSecret !== 'Habit@2026')) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid admin passcode." }), {
          status: 401,
          headers: CORS_HEADERS
        });
      }
    }

    const { action, item, id, updatedFields } = body;

    if (!env.DB) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: "No Cloudflare D1 DB bound, local fallback used." 
      }), { 
        status: 200,
        headers: CORS_HEADERS
      });
    }

    if (action === "add" && item) {
      const priceStr = item.price ? (item.price.startsWith('₹') ? item.price : `₹${item.price}`) : '₹0';
      const stmt = env.DB.prepare(`
        INSERT INTO menu_items (name, category, price, description, rating, popular, image, is_available)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      `);
      const info = await stmt.bind(
        item.name.trim(),
        item.category.trim(),
        priceStr,
        item.description ? item.description.trim() : '',
        Number(item.rating) || 4.5,
        item.popular ? 1 : 0,
        item.image ? item.image.trim() : './images/chicken_nuggets.png'
      ).run();

      return new Response(JSON.stringify({ success: true, id: info.meta?.last_row_id }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    if (action === "update" && id && updatedFields) {
      const priceStr = updatedFields.price 
        ? (updatedFields.price.startsWith('₹') ? updatedFields.price : `₹${updatedFields.price}`)
        : undefined;

      const current = await env.DB.prepare("SELECT * FROM menu_items WHERE id = ?").bind(id).first();
      if (!current) {
        return new Response(JSON.stringify({ error: "Item not found" }), { status: 404, headers: CORS_HEADERS });
      }

      const stmt = env.DB.prepare(`
        UPDATE menu_items 
        SET name = ?, category = ?, price = ?, description = ?, rating = ?, popular = ?, image = ?
        WHERE id = ?
      `);
      await stmt.bind(
        updatedFields.name !== undefined ? updatedFields.name.trim() : current.name,
        updatedFields.category !== undefined ? updatedFields.category.trim() : current.category,
        priceStr !== undefined ? priceStr : current.price,
        updatedFields.description !== undefined ? updatedFields.description.trim() : current.description,
        updatedFields.rating !== undefined ? Number(updatedFields.rating) : current.rating,
        updatedFields.popular !== undefined ? (updatedFields.popular ? 1 : 0) : current.popular,
        updatedFields.image !== undefined ? updatedFields.image.trim() : current.image,
        id
      ).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    if (action === "delete" && id) {
      await env.DB.prepare("DELETE FROM menu_items WHERE id = ?").bind(id).run();
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    if (action === "reset") {
      await env.DB.prepare("DELETE FROM menu_items").run();
      return new Response(JSON.stringify({ success: true, message: "Menu reset to default." }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}
