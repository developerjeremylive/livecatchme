export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };
        
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }
        
        // API Routes
        if (url.pathname === '/api/stats') {
            // Demo stats - in production this would query the database
            return new Response(JSON.stringify({
                totalEvents: 12847,
                activeDays: 23,
                appsTracked: 156,
                sessions: 89,
                memory: '0.2GB',
                storage: 'SQLite + FTS5'
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        
        if (url.pathname === '/api/events') {
            // Demo events
            const events = [
                { id: 1, kind: 'window', app: 'VS Code', title: 'working on catchme.py', timestamp: Date.now() - 120000 },
                { id: 2, kind: 'keystroke', app: 'Terminal', title: 'git commit -m "fix..."', timestamp: Date.now() - 300000 },
                { id: 3, kind: 'clipboard', app: 'Chrome', title: 'copied code snippet', timestamp: Date.now() - 480000 },
                { id: 4, kind: 'window', app: 'Slack', title: 'team discussion', timestamp: Date.now() - 720000 },
                { id: 5, kind: 'file', app: 'Finder', title: 'opened README.md', timestamp: Date.now() - 900000 }
            ];
            return new Response(JSON.stringify(events), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        
        if (url.pathname === '/api/timeline') {
            const timeline = [
                { hour: '09:00', events: 45, label: 'Morning work session' },
                { hour: '12:00', events: 23, label: 'Lunch break' },
                { hour: '14:00', events: 67, label: 'Afternoon deep work' },
                { hour: '18:00', events: 34, label: 'End of day wrap-up' }
            ];
            return new Response(JSON.stringify(timeline), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        
        if (url.pathname === '/api/search') {
            const query = url.searchParams.get('q') || '';
            // Demo search results
            const results = query ? [
                { id: 1, type: 'window', title: 'VS Code - catchme.py', snippet: 'Working on the web interface...', relevance: 0.95 },
                { id: 2, type: 'file', title: '/project/catchme/web.py', snippet: 'Flask application with API endpoints...', relevance: 0.85 },
                { id: 3, type: 'keystroke', title: 'Terminal session', snippet: 'git push origin main', relevance: 0.75 }
            ] : [];
            return new Response(JSON.stringify(results), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        
        // Serve static files from public folder
        if (url.pathname === '/' || url.pathname === '/index.html') {
            return new Response(INDEX_HTML, {
                headers: { 'Content-Type': 'text/html' }
            });
        }
        
        return new Response('Not Found', { status: 404 });
    }
};

const INDEX_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CatchMe - Playground</title>
    <style>
        :root {
            --primary: #ff6b35;
            --primary-dark: #e55a2b;
            --secondary: #1a1a2e;
            --accent: #16c79a;
            --dark: #0f0f1a;
            --light: #f8f9fa;
            --gray: #6c757d;
            --gradient: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--dark);
            color: var(--light);
            min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        h1 { 
            font-size: 2.5rem; 
            margin-bottom: 1rem;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle { color: var(--gray); margin-bottom: 2rem; }
        .playground {
            background: var(--secondary);
            border-radius: 20px;
            padding: 2rem;
            border: 1px solid rgba(255,107,53,0.2);
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .stat-card {
            background: rgba(255,107,53,0.1);
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
        }
        .stat-value { font-size: 2rem; font-weight: 700; color: var(--primary); }
        .stat-label { color: var(--gray); font-size: 0.9rem; }
        .search-box {
            width: 100%;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid rgba(255,107,53,0.3);
            background: var(--dark);
            color: var(--light);
            font-size: 1rem;
            margin-bottom: 1rem;
        }
        .events-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .event {
            background: rgba(255,255,255,0.02);
            padding: 1rem;
            border-radius: 8px;
            border-left: 3px solid var(--primary);
        }
        .event-app { font-weight: 600; }
        .event-time { font-size: 0.8rem; color: var(--gray); float: right; }
        .event-title { font-size: 0.9rem; color: var(--gray); }
        .demo-notice {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(22,199,154,0.1);
            border-radius: 8px;
            border: 1px solid rgba(22,199,154,0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🦞 CatchMe Playground</h1>
        <p class="subtitle">Interactive demo of the CatchMe digital footprint tracker</p>
        
        <div class="playground">
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-value" id="totalEvents">-</div>
                    <div class="stat-label">Total Events</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="activeDays">-</div>
                    <div class="stat-label">Active Days</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="appsTracked">-</div>
                    <div class="stat-label">Apps Tracked</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="sessions">-</div>
                    <div class="stat-label">Sessions</div>
                </div>
            </div>
            
            <input type="text" class="search-box" placeholder="Search your memory... (e.g., 'What did I code today?')" id="searchInput">
            
            <div class="events-list" id="eventsList"></div>
        </div>
        
        <div class="demo-notice">
            <strong>ℹ️ Demo Mode</strong> This playground shows a simulated interface. 
            Install CatchMe locally for full functionality with real-time activity tracking.
        </div>
    </div>
    
    <script>
        async function loadStats() {
            try {
                const res = await fetch('/api/stats');
                const data = await res.json();
                document.getElementById('totalEvents').textContent = data.totalEvents.toLocaleString();
                document.getElementById('activeDays').textContent = data.activeDays;
                document.getElementById('appsTracked').textContent = data.appsTracked;
                document.getElementById('sessions').textContent = data.sessions;
            } catch(e) { console.error(e); }
        }
        
        async function loadEvents() {
            try {
                const res = await fetch('/api/events');
                const events = await res.json();
                const list = document.getElementById('eventsList');
                list.innerHTML = events.map(e => \`
                    <div class="event">
                        <span class="event-app">\${e.app}</span>
                        <span class="event-time">\${Math.round((Date.now() - e.timestamp)/60000)} min ago</span>
                        <div class="event-title">\${e.title}</div>
                    </div>
                \`).join('');
            } catch(e) { console.error(e); }
        }
        
        document.getElementById('searchInput').addEventListener('input', async (e) => {
            const q = e.target.value;
            if (q.length < 2) return;
            try {
                const res = await fetch('/api/search?q=' + encodeURIComponent(q));
                const results = await res.json();
                console.log('Search results:', results);
            } catch(e) { console.error(e); }
        });
        
        loadStats();
        loadEvents();
    </script>
</body>
</html>`;