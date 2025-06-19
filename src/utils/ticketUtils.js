// Validate ticket number format
export const validateTicketNumber = (ticketNum) => {
    if (!ticketNum || ticketNum.length !== 15) {
      return "Ticket number must be exactly 15 characters long";
    }

    // Check if first 3 characters are "TKT"
    if (ticketNum.substring(0, 3) !== "TKT") {
      return "Ticket number must start with 'TKT'";
    }

    // Extract date components
    const yearPart = ticketNum.substring(3, 5);
    const monthPart = ticketNum.substring(5, 7);
    const dayPart = ticketNum.substring(7, 9);

    // Validate year (should be numbers)
    if (!/^\d{2}$/.test(yearPart)) {
      return "Invalid year format in ticket number";
    }

    // Validate month (01-12)
    const month = parseInt(monthPart);
    if (!/^\d{2}$/.test(monthPart) || month < 1 || month > 12) {
      return "Invalid month in ticket number (must be 01-12)";
    }

    // Validate day (01-31)
    const day = parseInt(dayPart);
    if (!/^\d{2}$/.test(dayPart) || day < 1 || day > 31) {
      return "Invalid day in ticket number (must be 01-31)";
    }

    // Check if remaining 6 characters are alphanumeric
    const randomPart = ticketNum.substring(9);
    if (!/^[A-Z0-9]{6}$/.test(randomPart)) {
      return "Invalid ticket number format";
    }

    return null;
  };

export const generateTicketPDF = async (ticket) => {
    if (!ticket) return;

    try {
        const pdfMakeModule = await import('pdfmake/build/pdfmake');
        const pdfFontsModule = await import('pdfmake/build/vfs_fonts');

        const pdfMake = pdfMakeModule.default;
        pdfMake.vfs = pdfFontsModule.default.vfs;

        const currentDate = new Date().toLocaleDateString();
        const securityHash = ticket.securityHash || generateSecurityHash(ticket);

        // Create compact security watermark
        const watermarkText = `${securityHash} • ${ticket.ticketNumber}`;

        const docDefinition = {
            pageSize: 'A5',
            pageMargins: [20, 20, 20, 20], // Reduced margins
            background: [
                {
                    canvas: [
                        {
                            type: 'rect',
                            x: 0,
                            y: 0,
                            w: 420,
                            h: 595,
                            color: '#f8fafc'
                        }
                    ]
                },
                // Single centered watermark
                {
                    text: watermarkText,
                    color: '#e2e8f0',
                    opacity: 0.2,
                    fontSize: 6,
                    absolutePosition: { x: 150, y: 280 },
                    angle: -45
                }
            ],
            content: [
                // Compact header
                {
                    columns: [
                        {
                            text: 'MATCH TICKET',
                            style: 'header',
                            width: '*'
                        },
                        {
                            text: 'VALID',
                            style: 'validBadge',
                            width: 'auto'
                        }
                    ],
                    margin: [0, 0, 0, 10]
                },
                
                // Compact ticket number
                {
                    text: ticket.ticketNumber,
                    style: 'ticketNumber',
                    alignment: 'center',
                    margin: [0, 0, 0, 15]
                },

                // Compact ticket details in 2 columns
                {
                    columns: [
                        {
                            width: '50%',
                            table: {
                                widths: ['*'],
                                body: [
                                    [{ text: 'FULL NAME', style: 'detailLabel' }],
                                    [{ text: ticket.fullName, style: 'detailValue' }],
                                    [{ text: 'PHONE', style: 'detailLabel' }],
                                    [{ text: ticket.phoneNumber, style: 'detailValue' }],
                                    [{ text: 'CATEGORY', style: 'detailLabel' }],
                                    [{ text: ticket.category, style: 'detailValue' }],
                                    [{ text: 'AMOUNT', style: 'detailLabel' }],
                                    [{ text: `KSH ${ticket.amount.toLocaleString()}`, style: 'detailValue' }]
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            width: '50%',
                            table: {
                                widths: ['*'],
                                body: [
                                    [{ text: 'GAME', style: 'detailLabel' }],
                                    [{ text: ticket.event.match, style: 'statusValid' }],
                                    [{ text: 'GAME VENUE', style: 'detailLabel' }],
                                    [{ text: ticket.event.venue, style: 'statusValid' }],
                                    [{ text: 'GAME DATE', style: 'detailLabel' }],
                                    [{ text: ticket.event.date, style: 'detailValue' }],
                                    [{ text: 'STATUS', style: 'detailLabel' }],
                                    [{ text: 'PAID & VALID', style: 'statusValid' }]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ],
                    columnGap: 15,
                    margin: [0, 0, 0, 15]
                },

                // Compact QR Code section
                ticket.qrCode ? {
                    stack: [
                        { text: 'SCAN QR CODE FOR ENTRY', style: 'qrLabel' },
                        {
                            image: ticket.qrCode,
                            width: 80,
                            height: 80,
                            alignment: 'center',
                            margin: [0, 5, 0, 0]
                        }
                    ],
                    alignment: 'center',
                    margin: [0, 0, 0, 12]
                } : {},

                // Compact security section
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [{
                                stack: [
                                    {
                                        columns: [
                                            { text: '#', style: 'securityLabel', width: 'auto' },
                                            { text: securityHash, style: 'securityHash', width: '*' }
                                        ]
                                    }
                                ],
                                fillColor: '#fef3c7',
                                border: [false, false, false, false]
                            }]
                        ]
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 0, 10]
                },

                // Compact footer
                {
                    stack: [
                        { text: `Generated: ${currentDate}`, style: 'footer' },
                        { text: 'Present this ticket and valid ID for entry', style: 'footer' },
                        { text: 'Unauthorized reproduction prohibited', style: 'securityNotice' }
                    ]
                }
            ],
            styles: {
                header: {
                    fontSize: 16,
                    color: '#1e293b'
                },
                validBadge: {
                    fontSize: 10,
                    color: '#ffffff',
                    fillColor: '#059669',
                    color: '#2563eb',
                    fillColor: '#f1f5f9',
                    letterSpacing: 1,
                    margin: [10, 6, 10, 6]
                },
                detailLabel: {
                    fontSize: 7,
                    color: '#475569',
                    margin: [5, 2, 5, 1]
                },
                detailValue: {
                    fontSize: 9,
                    color: '#1e293b',
                    margin: [5, 1, 5, 4]
                },
                statusValid: {
                    fontSize: 9,
                    color: '#059669',
                    margin: [5, 1, 5, 4]
                },
                qrLabel: {
                    fontSize: 8,
                    color: '#374151',
                    alignment: 'center'
                },
                securityLabel: {
                    fontSize: 7,
                    color: '#92400e',
                    margin: [5, 3, 2, 3]
                },
                securityHash: {
                    fontSize: 7,
                    color: '#451a03',
                    margin: [0, 3, 5, 3]
                },
                footer: {
                    fontSize: 7,
                    color: '#64748b',
                    alignment: 'center',
                    margin: [0, 1, 0, 1]
                },
                securityNotice: {
                    fontSize: 6,
                    color: '#dc2626',
                    alignment: 'center',
                    margin: [0, 1, 0, 0]
                }
            },
            defaultStyle: {
                // font: 'Helvetica'
            },
            info: {
                title: `Match Ticket - ${ticket.ticketNumber}`,
                author: "Ticket Management System",
                subject: `Match Ticket for ${ticket.fullName}`,
                keywords: `ticket, match, ${ticket.ticketNumber}, ${ticket.fullName}`,
                creator: "Secure Ticketing System",
                producer: "Match Event Management"
            }
        };

        // Generate and download the PDF
        pdfMake.createPdf(docDefinition).download(`Ticket_${ticket.ticketNumber}_${ticket.fullName.replace(/\s+/g, '_')}.pdf`);

    } catch (error) {
        console.error('Error generating PDF:', error);
        // Fallback to original HTML method if pdfmake fails
        generatePDFFallback(ticket);
    }
};

// Generate security hash for ticket validation
const generateSecurityHash = (ticket) => {
    const dataString = `${ticket.ticketNumber}${ticket.fullName}${ticket.amount}${ticket.phoneNumber}${ticket.category}`;
    
    // Simple hash function (in production, use a more secure method)
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
        const char = dataString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert to hex and add prefix
    const hexHash = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
    return `SEC${hexHash}VER`;
};

// Fallback HTML method (your original implementation)
// Optimized A5 PDF Generator - Fits perfectly on one page
const generatePDFFallback = (ticket) => {
    const securityHash = ticket.securityHash || generateSecurityHash(ticket);
    const printWindow = window.open('', '_blank');
    
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Match Ticket - ${ticket.ticketNumber}</title>
        <style>
          @page { 
            size: A5; 
            margin: 0; 
          }
          * {
            box-sizing: border-box;
          }
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 10px; 
            background: linear-gradient(135deg, #1e293b, #334155);
            color: white;
            height: 100vh;
            width: 100vw;
            position: relative;
            font-size: 12px;
          }
          body::before {
            content: "${securityHash} • SECURE TICKET • ${ticket.ticketNumber}";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 10px;
            color: rgba(255,255,255,0.08);
            font-weight: bold;
            white-space: nowrap;
            z-index: 1;
            pointer-events: none;
          }
          .ticket-container {
            background: white;
            color: black;
            border-radius: 10px;
            padding: 15px;
            height: calc(100vh - 20px);
            position: relative;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            z-index: 2;
            display: flex;
            flex-direction: column;
          }
          .security-hash {
            position: absolute;
            top: 5px;
            left: 5px;
            font-size: 6px;
            color: #666;
            font-family: monospace;
            background: #f0f0f0;
            padding: 1px 2px;
            border-radius: 2px;
          }
          .status-badge {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #10b981;
            color: white;
            padding: 4px 8px;
            border-radius: 10px;
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .ticket-header {
            text-align: center;
            border-bottom: 1px dashed #ccc;
            padding-bottom: 10px;
            margin-bottom: 12px;
            margin-top: 15px;
          }
          .ticket-title {
            font-size: 18px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 6px;
            text-align: center;
          }
          .ticket-number {
            font-size: 14px;
            font-weight: bold;
            background: #f3f4f6;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
            letter-spacing: 1px;
          }
          .ticket-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 12px;
            flex-grow: 1;
          }
          .detail-item {
            background: #f8fafc;
            padding: 6px;
            border-radius: 4px;
            border-left: 2px solid #2563eb;
            min-height: 35px;
          }
          .detail-label {
            font-size: 8px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 2px;
            line-height: 1.2;
          }
          .detail-value {
            font-size: 11px;
            font-weight: bold;
            color: #1e293b;
            line-height: 1.3;
            word-wrap: break-word;
          }
          .qr-section {
            text-align: center;
            margin-top: auto;
            padding-top: 10px;
            border-top: 1px dashed #ccc;
          }
          .qr-code {
            width: 80px;
            height: 80px;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
          }
          .qr-label {
            margin-bottom: 8px;
            font-weight: bold;
            color: #374151;
            font-size: 10px;
          }
          .ticket-footer {
            text-align: center;
            font-size: 7px;
            color: #64748b;
            margin-top: 8px;
            line-height: 1.3;
          }
          .ticket-footer div {
            margin: 2px 0;
          }
          .security-footer {
            font-size: 6px;
            color: #dc2626;
          }
          
          /* Specific adjustments for better space usage */
          .detail-item:nth-child(odd) {
            margin-right: 4px;
          }
          .detail-item:nth-child(even) {
            margin-left: 4px;
          }
          
          @media print {
            body { 
              background: white !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
            .ticket-container {
              box-shadow: none;
              height: 100vh;
            }
            @page {
              size: A5;
              margin: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="ticket-container">
          <div class="security-hash">SEC: ${securityHash}</div>
          <div class="status-badge">VALID</div>
          
          <div class="ticket-header">
            <div class="ticket-title">MATCH TICKET</div>
            <div class="ticket-number">${ticket.ticketNumber}</div>
          </div>

          <div class="ticket-details">
            <div class="detail-item">
              <div class="detail-label">Full Name</div>
              <div class="detail-value">${ticket.fullName}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Game</div>
              <div class="detail-value">${ticket.event.match}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Venue</div>
              <div class="detail-value">${ticket.event.venue}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Date</div>
              <div class="detail-value">${ticket.event.date}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Category</div>
              <div class="detail-value">${ticket.category}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Amount</div>
              <div class="detail-value">KSH ${ticket.amount.toLocaleString()}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Phone</div>
              <div class="detail-value">${ticket.phoneNumber}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Generated</div>
              <div class="detail-value">${new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div class="qr-section">
            <div class="qr-label">Scan for Entry</div>
            <img src="${ticket.qrCode}" alt="QR Code" class="qr-code" />
          </div>

          <div class="ticket-footer">
            <div>Present this ticket and valid ID for entry</div>
            <div class="security-footer">Security Hash: ${securityHash}</div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 500);
};

// Keep the old function name for backward compatibility
export const generatePDF = generateTicketPDF;