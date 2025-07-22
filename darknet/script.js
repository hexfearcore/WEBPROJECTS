document.addEventListener('DOMContentLoaded', () => {

        // --- GLOBAL STATE ---
        let isToolRunning = false;

        // --- INITIALIZATION ---
        initMatrixBackground();
        initInteractiveTools();
        initSystemLog();

        // --- 1. MATRIX BACKGROUND EFFECT (REWRITTEN & CORRECTED) ---
        function initMatrixBackground() {
            const canvas = document.getElementById('matrix-canvas');
            const ctx = canvas.getContext('2d');

            let columns, rainDrops;
            let animationInterval;

            function setup() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                columns = Math.floor(canvas.width / 16);
                rainDrops = Array.from({ length: columns }).map(() => 1);
            }

            function draw() {
                ctx.fillStyle = 'rgba(2, 4, 10, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // CORRECTED: Use a direct color value for the canvas, not a CSS variable
                ctx.fillStyle = '#00ff6a'; 
                ctx.font = '16px monospace';

                for (let i = 0; i < rainDrops.length; i++) {
                    const text = Math.random() > 0.5 ? '1' : '0';
                    ctx.fillText(text, i * 16, rainDrops[i] * 16);
                    if (rainDrops[i] * 16 > canvas.height && Math.random() > 0.975) {
                        rainDrops[i] = 0;
                    }
                    rainDrops[i]++;
                }
            }

            // ROBUST RESIZE HANDLER
            window.addEventListener('resize', () => {
                clearInterval(animationInterval); // Stop the old animation
                setup(); // Re-calculate dimensions
                animationInterval = setInterval(draw, 40); // Start a new, single animation
            });

            // Initial setup and start
            setup();
            animationInterval = setInterval(draw, 40);
        }

        // --- 2. AUTONOMOUS SYSTEM LOG ---
        function initSystemLog() {
            const terminalOutput = document.getElementById('terminal-output');
            const logMessages = [
                'Checking core integrity...', 'Syncing with chronoserver...', 'Compiling quantum state...',
                'System nominal. Awaiting command.', 'Calibrating neural net...', 'Defragmenting memory shards...',
                'Accessing encrypted datastream...', 'Firewall integrity: 100%', 'Running diagnostics...',
                'Detecting quantum fluctuations...', 'Secure connection established.', 'Initializing sub-routines...'
            ];

            const typeLogEntry = () => {
                if (isToolRunning) { // Pause log if a tool is running
                    setTimeout(typeLogEntry, 2000);
                    return;
                }

                const message = logMessages[Math.floor(Math.random() * logMessages.length)];
                const line = document.createElement('div');
                const prompt = document.createElement('span');
                prompt.className = 'prompt';
                prompt.textContent = '$';
                line.appendChild(prompt);
                
                const textElement = document.createElement('span');
                line.appendChild(textElement);
                terminalOutput.appendChild(line);

                if (terminalOutput.children.length > 15) {
                    terminalOutput.removeChild(terminalOutput.firstChild); // Keep log from getting too long
                }

                typeWriter(textElement, message, 0, () => {
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                    const randomDelay = Math.random() * 3000 + 1000; // Wait 1-4 seconds
                    setTimeout(typeLogEntry, randomDelay);
                });
            };
            
            setTimeout(typeLogEntry, 1000); // Initial delay
        }

        // --- 3. INTERACTIVE TOOL LOGIC ---
        function initInteractiveTools() {
            const terminalOutput = document.getElementById('terminal-output');
            const systemStatus = document.getElementById('system-status');
            const toolButtons = document.querySelectorAll('.tool-card button');

            const toolMessages = {
                'Ghost Protocol': ['Initiating Ghost Protocol...', 'Encrypting data packets...', 'Rerouting traffic through 12 anonymous proxies...', 'SUCCESS: Digital signature is untraceable.'],
                'Cryptex Decryptor': ['Executing Cryptex Decryptor v3.1...', 'Analyzing quantum encryption layer...', 'Heuristic algorithm processing... [ETA: 45s]', 'SUCCESS: Access granted to secure data vault.'],
                'Neural-Link': ['Connecting to Neural-Link interface...', 'Calibrating bio-feedback sensors...', 'Bypassing mainframe security...', 'SUCCESS: Direct system control established.'],
                'Data Scrambler': ['Deploying Data Scrambler...', 'Injecting chaotic code into target logs...', 'Corrupting data indexes... 100%.', 'SUCCESS: All logs have been rendered unreadable.'],
                'Spectre Drone': ['Launching virtual Spectre Drone...', 'Scanning for vulnerabilities... Open ports: 22, 80, 443.', 'Streaming reconnaissance data...', 'SUCCESS: Full network topology mapped.'],
                'Overlord Rootkit': ['Installing Overlord Rootkit...', 'Searching for kernel-level exploits...', 'Escalating privileges...', 'SUCCESS: Root access achieved. You are now system administrator.']
            };

            toolButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (isToolRunning) return;

                    isToolRunning = true;
                    toolButtons.forEach(btn => btn.disabled = true);
                    
                    const toolName = button.dataset.tool;
                    const messages = toolMessages[toolName] || ['Error: Tool not found.'];
                    
                    systemStatus.textContent = `[EXECUTING: ${toolName.toUpperCase()}]`;
                    terminalOutput.innerHTML = ''; // Clear the autonomous log

                    runToolProcess(messages, 0, () => {
                        isToolRunning = false;
                        systemStatus.textContent = '[ALL SYSTEMS NOMINAL]';
                        toolButtons.forEach(btn => btn.disabled = false);
                        setTimeout(initSystemLog, 1000); // Restart the autonomous log after a short pause
                    });
                });
            });

            function runToolProcess(messages, index, onComplete) {
                if (index < messages.length) {
                    const line = document.createElement('div');
                    const prompt = document.createElement('span');
                    prompt.className = 'prompt';
                    prompt.textContent = '>';
                    line.appendChild(prompt);
                    
                    const textElement = document.createElement('span');
                    line.appendChild(textElement);
                    terminalOutput.appendChild(line);

                    typeWriter(textElement, messages[index], 0, () => {
                        terminalOutput.scrollTop = terminalOutput.scrollHeight;
                        setTimeout(() => runToolProcess(messages, index + 1, onComplete), 500); // Delay between lines
                    });
                } else {
                    onComplete();
                }
            }
        }

        // --- UTILITY: TYPEWRITER EFFECT ---
        function typeWriter(element, text, index, callback) {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                const randomSpeed = Math.random() * 50 + 20; // Type speed
                setTimeout(() => typeWriter(element, text, index + 1, callback), randomSpeed);
            } else if (callback) {
                setTimeout(callback, 500); // Delay after line is finished
            }
        }
    });