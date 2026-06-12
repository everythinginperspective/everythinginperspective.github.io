console.log('Clickhouse script loaded');

async function trackClickhousePageView() {
  try {
    console.log('Clickhouse: Starting page view tracking');
    
    // Try to fetch IP data from ip-api.com
    // Commented out ipapi.co: const ipData = await fetch('https://ipapi.co/json/').then(r => r.json());
    let ipData = null;
    try {
      const response = await fetch('http://ip-api.com/json/');
      if (response.ok) {
        ipData = await response.json();
        console.log('Clickhouse: IP data fetched', ipData);
      } else {
        console.warn('Clickhouse: IP fetch failed, status', response.status);
      }
    } catch (ipError) {
      console.warn('Clickhouse: IP fetch error (continuing without IP):', ipError);
    }
    
    const date = new Date();
    const tzOffset = -date.getTimezoneOffset() / 60;
    
    const payload = {
      event_name: 'page_view',
      timestamp: date.toISOString(),
      ip: ipData?.query || '',
      continent: ipData?.continent || '',
      country: ipData?.country || '',
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      date_iso: date.toISOString(),
      timezone_offset: tzOffset,
      current_url: location.href,
      current_host: location.host
    };
    console.log('Clickhouse: Payload created', payload);
    
    const escapeSQL = (str) => String(str).replace(/'/g, "\\'");
    const query = `INSERT INTO page_views (event_name, timestamp, ip, continent, country, referrer, user_agent, date_iso, timezone_offset, current_url, current_host) VALUES ('${payload.event_name}', '${payload.timestamp}', '${escapeSQL(payload.ip)}', '${escapeSQL(payload.continent)}', '${escapeSQL(payload.country)}', '${escapeSQL(payload.referrer)}', '${escapeSQL(payload.user_agent)}', '${payload.date_iso}', ${payload.timezone_offset}, '${escapeSQL(payload.current_url)}', '${escapeSQL(payload.current_host)}')`;
    console.log('Clickhouse: Query prepared');
    
    const response = await fetch('https://ibio8yveei.asia-southeast1.gcp.clickhouse.cloud:8443', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa('insertsonly:Insertsonly1@')
      },
      body: query,
      keepalive: true
    });
    console.log('Clickhouse: Response status', response.status);
    if (!response.ok) {
      const text = await response.text();
      console.error('Clickhouse: Error response', text);
    } else {
      console.log('Clickhouse: Insert successful');
    }
  } catch (e) {
    console.error('Clickhouse tracking error:', e);
  }
}

if (!window.__clickhouseTracked) {
  window.__clickhouseTracked = true;
  console.log('Clickhouse: Calling trackClickhousePageView');
  trackClickhousePageView();
} else {
  console.log('Clickhouse: Already tracked, skipping');
}
