
//document.addEventListener("DOMContentLoaded", function() {

document.addEventListener("DOMContentLoaded", function() {

    const scriptStartTime = Date.now();
    // Session-
    let sessionId = getCookie('analytics_session');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        setCookie('analytics_session', sessionId, 30); // 30 day 
    }

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    const pageEntryTime = Date.now();
    let lastActivityTime = Date.now();
    let pendingData = [];
let maxScrollDepth = 0;
let readingTime = 0;
let lastScrollTime = Date.now();
let recentClicks = [];

// 1. TOUCH SUPPORT DETECTION
function getTouchSupport() {
    return {
        touchSupport: 'ontouchstart' in window,
        maxTouchPoints: navigator.maxTouchPoints || 0,
        touchDevice: 'ontouchstart' in window && navigator.maxTouchPoints > 0
    };
}

    // -static
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const cookiesEnabled = navigator.cookieEnabled;
    const jsEnabled = true;
    const screenHeight = screen.height;
    const screenWidth = screen.width;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const connectionType = navigator.connection ? navigator.connection.effectiveType : 'unknown';
const touchData = getTouchSupport();
    function checkCSS() {
        const testDiv = document.createElement('div');
        testDiv.style.display = 'none';
        document.body.appendChild(testDiv);
        const enabled = window.getComputedStyle(testDiv).display === 'none';
        document.body.removeChild(testDiv);
        return enabled;
    }

    const imagesTest = new Image();
    imagesTest.onload = imagesTest.onerror = () => {
        sendToServer('static', {
            sessionId,
            userAgent,
            language,
            cookiesEnabled,
            jsEnabled,
            imagesEnabled: imagesTest.complete && imagesTest.naturalHeight !== 0,
            cssEnabled: checkCSS(),
            screenHeight,
            screenWidth,
            windowHeight,
            windowWidth,
            connectionType,
            ...touchData,
            pageUrl: window.location.href,
            referrer: document.referrer,
            timestamp: Date.now()
        });
    };
    imagesTest.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
//performance


window.addEventListener('load', function() {
    const loadEndTime = Date.now();
    console.log(document.referrer);
    sendToServer('performance', {
        sessionId,
        loadStart: scriptStartTime,
        loadEnd: loadEndTime,
        totalLoadTime: loadEndTime - scriptStartTime,
        timestamp: Date.now()
    });
});
    //activity
    function recordActivity(type, extra = {}) {
        const data = { sessionId, type, timestamp: Date.now(), ...extra };
        sendToServer('activity', data);
        lastActivityTime = Date.now();
    }

    // Eerrors
    window.onerror = (msg, src, line, col, err) => recordActivity('error', { message: msg, source: src, line, col });

    // Mouse
    ['mousemove', 'click', 'scroll'].forEach(evt =>
        document.addEventListener(evt, e => {
            const data = evt === 'scroll'
    ? { scrollX: window.scrollX, scrollY: window.scrollY, pageUrl: window.location.href }
    : { x: e.clientX, y: e.clientY, ...(evt === 'click' ? { button: e.button } : {}) };
            recordActivity(evt, data);
        })
    );

    // Keyboard
    ['keydown', 'keyup'].forEach(evt => document.addEventListener(evt, e => recordActivity(evt, { key: e.key })));

    // Idle tracking every 2 seconds
    setInterval(() => {
        const idleTime = Date.now() - lastActivityTime;
        if (idleTime >= 2000) {
            recordActivity('idle', { idleDuration: idleTime });
            lastActivityTime = Date.now();
        }
    }, 2000);

    // Page entry
    recordActivity('page_entry', { pageUrl: window.location.href, timestamp: pageEntryTime });

    // Page exit
    window.addEventListener('beforeunload', () => {
        const exitData = {
            sessionId,
            type: 'page_exit',
            pageUrl: window.location.href,
            timeOnPage: Date.now() - pageEntryTime,
            timestamp: Date.now()
        };
        navigator.sendBeacon('/api/activity', JSON.stringify(exitData));
    });

    
    function sendToServer(endpoint, data) {
        pendingData.push({ endpoint, data });
        fetch('/api/' + endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => { if (res.ok) removePending(data); })
            .catch(() => {});
    }

    function removePending(data) {
        pendingData = pendingData.filter(item => !(item.data.sessionId === data.sessionId && item.data.timestamp === data.timestamp));
    }

    // Retry every 60 seconds
    setInterval(() => {
        pendingData.forEach(item => {
            fetch('/api/' + item.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item.data) })
                .then(res => { if (res.ok) removePending(item.data); })
                .catch(() => {});
        });
    }, 60000);






function initializeReadingTracking() {
    let scrollSampler = 0;
    
    window.addEventListener('scroll', () => {
        scrollSampler++;
let maxScrollDepth = 0;
let readingTime = 0;
let lastScrollTime = Date.now();
let recentClicks = [];

// 1. TOUCH SUPPORT DETECTION
function getTouchSupport() {
    return {
        touchSupport: 'ontouchstart' in window,
        maxTouchPoints: navigator.maxTouchPoints || 0,
        touchDevice: 'ontouchstart' in window && navigator.maxTouchPoints > 0
    };
}
        if (scrollSampler % 3 === 0) { // Sample every 3rd scroll event for performance
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            maxScrollDepth = Math.max(maxScrollDepth, scrollPercent || 0);
          
            // Reading time estimation (slow scrolling = reading)
            const now = Date.now();
            const timeDiff = now - lastScrollTime;
            if (timeDiff > 1000 && timeDiff < 5000) { // 1-5 seconds between scrolls = reading
                readingTime += timeDiff;
            }
            lastScrollTime = now;
        }
    });
    
    // Send reading behavior data every 15 seconds
    setInterval(() => {
        if (maxScrollDepth > 0) {
            sendToServer('reading_behavior', {
                sessionId,
                pageUrl: window.location.href,
                maxScrollDepth,
                estimatedReadingTime: Math.round(readingTime / 1000), // Convert to seconds
                timestamp: Date.now()
            });
        }
    }, 15000);
}



function initializeRageClickTracking() {
    document.addEventListener('click', (e) => {
        const now = Date.now();
        const clickPoint = { 
            x: e.clientX, 
            y: e.clientY, 
            timestamp: now,
            element: e.target.tagName.toLowerCase()
        };
        
        // Keep only clicks from last 2 seconds
        recentClicks = recentClicks.filter(click => now - click.timestamp <= 2000);
        recentClicks.push(clickPoint);
        
        // Detect rage clicks: 3+ clicks within 50px radius in 2 seconds
        if (recentClicks.length >= 3) {
            const distances = recentClicks.map(click => 
                Math.sqrt(Math.pow(click.x - clickPoint.x, 2) + Math.pow(click.y - clickPoint.y, 2))
            );
            
            // If all clicks are within 50px radius
            if (distances.every(d => d < 50)) {
                recordActivity('rage_click', {
                    x: clickPoint.x,
                    y: clickPoint.y,
                    clickCount: recentClicks.length,
                    element: clickPoint.element,
                    consecutiveClicks: recentClicks.length
                });
                
                // Clear recent clicks to avoid duplicate rage click events
                recentClicks = [];
            }
        }
    });
}



initializeReadingTracking();
initializeRageClickTracking();
// Enhanced page exit with reading behavior summary
window.addEventListener('beforeunload', () => {
    const readingSummary = {
        sessionId,
        type: 'reading_summary',
        pageUrl: window.location.href,
	referrer:document.referrer,
        finalScrollDepth: maxScrollDepth,
        totalReadingTime: Math.round(readingTime / 1000), // seconds
        timeOnPage: Math.round((Date.now() - pageEntryTime) / 1000), // seconds
        readingRatio: readingTime > 0 ? Math.round((readingTime / (Date.now() - pageEntryTime)) * 100) : 0, // % of time spent reading
        timestamp: Date.now()
    };
    
    // Use fetch for consistency (non-blocking)
    fetch('/api/reading_summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(readingSummary),
        keepalive: true // Ensures request completes even if page is unloading
    }).catch(() => {}); // Silent fail
});

});
