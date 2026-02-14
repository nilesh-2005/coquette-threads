const products = [
    {
        title: "Antique Gold Classic Victorian Gown",
        slug: "antique-gold-classic-victorian-gown",
        sku: "CT-1001",
        shortDescription: "Off-shoulder antique gold satin gown with intricate lace-trimmed bodice and brocade panel skirt.",
        description: "<p>A breathtaking recreation of Victorian grandeur, this antique gold satin gown features a structured off-shoulder bodice adorned with zigzag lace trim detailing. The fitted waist flows into a voluminous gathered skirt with a contrasting brocade front panel. Ruched puff cap sleeves in matching brocade fabric complete the period-authentic silhouette. Every stitch whispers of candlelit ballrooms and aristocratic elegance.</p>",
        price: 195000,
        currency: "INR",
        categories: [],
        tags: ["gold", "satin", "lace", "victorian", "off-shoulder", "brocade"],
        images: [
            { url: "/assets/gowns/antique-gold-classic-victorian-gown/antique-gold-classic-victorian-gown-wh.png", alt: "Antique Gold Classic Victorian Gown — front view on white background", type: "hero" },
            { url: "/assets/gowns/antique-gold-classic-victorian-gown/antique-gold-classic-victorian-gown.jpg", alt: "Antique Gold Classic Victorian Gown — styled editorial shot", type: "zoom" }
        ],
        variants: [
            { sku: "CT-1001-XS-AG", size: "XS", color: "Antique Gold", fabric: "Silk Satin & Brocade", inventoryQty: 2 },
            { sku: "CT-1001-S-AG", size: "S", color: "Antique Gold", fabric: "Silk Satin & Brocade", inventoryQty: 3 },
            { sku: "CT-1001-M-AG", size: "M", color: "Antique Gold", fabric: "Silk Satin & Brocade", inventoryQty: 2 },
            { sku: "CT-1001-L-AG", size: "L", color: "Antique Gold", fabric: "Silk Satin & Brocade", inventoryQty: 1 }
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Antique Gold", hex: "#c5a44e" }],
        fabric: "Silk Satin & Brocade",
        silhouette: "Ball Gown",
        neckline: "Off-shoulder",
        sleeve: "Puff cap sleeve",
        embellishments: ["lace trim", "brocade panel", "zigzag stitching"],
        careInstructions: "Dry clean only. Store hanging in garment bag.",
        productionLeadTime: "4–6 weeks",
        measurements: {
            bust: { XS: 82, S: 86, M: 90, L: 94 },
            waist: { XS: 62, S: 66, M: 70, L: 74 }
        },
        isMadeToOrder: true,
        published: true
    },
    {
        title: "Blush Pink Regency Embroidered Gown",
        slug: "blush-pink-regency-embroidered-gown",
        sku: "CT-1002",
        shortDescription: "Pearl-embroidered blush pink Regency-era empire waist gown with puff sleeves and matching opera gloves.",
        description: "<p>Step into a Bridgerton fantasy with this exquisite blush pink Regency gown. The empire waist bodice is lavishly embroidered with hand-placed freshwater pearls and delicate floral beadwork at the scoop neckline. Dreamy puff sleeves in embroidered tulle float above matching elbow-length opera gloves. The flowing skirt features all-over floral vine embroidery on soft tulle over a blush satin lining. A jewelled brooch accents the ribbon waistband.</p>",
        price: 225000,
        currency: "INR",
        categories: [],
        tags: ["pink", "blush", "pearl", "embroidered", "regency", "bridgerton", "puff-sleeve"],
        images: [
            { url: "/assets/gowns/blush-pink-regency-embroidered-gown/blush-pink-regency-embroidered-gown-wh.png", alt: "Blush Pink Regency Embroidered Gown — front view on white background", type: "hero" },
            { url: "/assets/gowns/blush-pink-regency-embroidered-gown/blush-pink-regency-embroidered-gown.jpeg", alt: "Blush Pink Regency Embroidered Gown — styled editorial shot", type: "zoom" }
        ],
        variants: [
            { sku: "CT-1002-XS-BP", size: "XS", color: "Blush Pink", fabric: "Embroidered Tulle over Satin", inventoryQty: 2 },
            { sku: "CT-1002-S-BP", size: "S", color: "Blush Pink", fabric: "Embroidered Tulle over Satin", inventoryQty: 3 },
            { sku: "CT-1002-M-BP", size: "M", color: "Blush Pink", fabric: "Embroidered Tulle over Satin", inventoryQty: 2 },
            { sku: "CT-1002-L-BP", size: "L", color: "Blush Pink", fabric: "Embroidered Tulle over Satin", inventoryQty: 2 }
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Blush Pink", hex: "#e8b4b8" }],
        fabric: "Embroidered Tulle over Satin",
        silhouette: "Empire Waist A-Line",
        neckline: "Scoop with pearl embroidery",
        sleeve: "Puff sleeve",
        embellishments: ["freshwater pearls", "floral beadwork", "jewelled brooch", "ribbon waistband"],
        careInstructions: "Dry clean only. Matching gloves included.",
        productionLeadTime: "5–7 weeks",
        measurements: {
            bust: { XS: 80, S: 84, M: 88, L: 92 },
            waist: { XS: 64, S: 68, M: 72, L: 76 }
        },
        isMadeToOrder: true,
        published: true
    },
    {
        title: "Champagne Beaded Vintage Evening Gown",
        slug: "champagne-beaded-vintage-evening-gown",
        sku: "CT-1003",
        shortDescription: "Art Deco-inspired champagne column gown with intricate geometric beadwork and cap sleeves.",
        description: "<p>Channel the opulence of the 1920s with this Art Deco champagne evening gown. The fitted column silhouette is covered entirely in geometric beadwork — cascading scalloped arches and feather-like motifs in silver and gold micro-beads over nude tulle. Delicate cap sleeves frame the shoulders while the gown skims the body with timeless sophistication. A true showpiece for galas, award nights, and red-carpet moments.</p>",
        price: 245000,
        currency: "INR",
        categories: [],
        tags: ["champagne", "beaded", "art-deco", "vintage", "column", "gatsby"],
        images: [
            { url: "/assets/gowns/champagne-beaded-vintage-evening-gown/champagne-beaded-vintage-evening-gown-wh.png", alt: "Champagne Beaded Vintage Evening Gown — front view on white background", type: "hero" },
            { url: "/assets/gowns/champagne-beaded-vintage-evening-gown/champagne-beaded-vintage-evening-gown.jpeg", alt: "Champagne Beaded Vintage Evening Gown — styled editorial shot", type: "zoom" }
        ],
        variants: [
            { sku: "CT-1003-XS-CH", size: "XS", color: "Champagne", fabric: "Beaded Tulle over Nude Lining", inventoryQty: 1 },
            { sku: "CT-1003-S-CH", size: "S", color: "Champagne", fabric: "Beaded Tulle over Nude Lining", inventoryQty: 2 },
            { sku: "CT-1003-M-CH", size: "M", color: "Champagne", fabric: "Beaded Tulle over Nude Lining", inventoryQty: 2 },
            { sku: "CT-1003-L-CH", size: "L", color: "Champagne", fabric: "Beaded Tulle over Nude Lining", inventoryQty: 1 }
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Champagne", hex: "#d4b896" }],
        fabric: "Beaded Tulle over Nude Lining",
        silhouette: "Column / Sheath",
        neckline: "Scoop",
        sleeve: "Cap sleeve",
        embellishments: ["geometric beadwork", "scalloped arches", "micro-bead feather motifs"],
        careInstructions: "Professional dry clean only. Handle with extreme care.",
        productionLeadTime: "6–8 weeks",
        measurements: {
            bust: { XS: 80, S: 84, M: 88, L: 92 },
            waist: { XS: 60, S: 64, M: 68, L: 72 }
        },
        isMadeToOrder: true,
        published: true
    },
    {
        title: "Ivory Floral Empire Waist Gown",
        slug: "ivory-floral-empire-waist-gown",
        sku: "CT-1004",
        shortDescription: "Ivory tulle Regency gown with stunning silver floral appliqué, puff sleeves, and matching opera gloves.",
        description: "<p>A masterwork of neo-Regency couture, this ivory empire waist gown features cascading silver floral appliqué layered across the entire length of the tulle skirt. The scoop-neck bodice is delicately embroidered with matching floral motifs, with sheer puff sleeves lending an ethereal softness. White satin opera gloves accompany the piece. Oversized three-dimensional flower bursts at the hem create a dramatic snowflake-like effect, making every step a visual poem.</p>",
        price: 265000,
        currency: "INR",
        categories: [],
        tags: ["ivory", "floral", "applique", "silver", "empire-waist", "regency", "bridal"],
        images: [
            { url: "/assets/gowns/ivory-floral-empire-waist-gown/ivory-floral-empire-waist-gown-wh.png", alt: "Ivory Floral Empire Waist Gown — front view on white background", type: "hero" },
            { url: "/assets/gowns/ivory-floral-empire-waist-gown/ivory-floral-empire-waist-gown.jpeg", alt: "Ivory Floral Empire Waist Gown — styled editorial shot", type: "zoom" }
        ],
        variants: [
            { sku: "CT-1004-XS-IV", size: "XS", color: "Ivory", fabric: "Tulle with Floral Appliqué", inventoryQty: 2 },
            { sku: "CT-1004-S-IV", size: "S", color: "Ivory", fabric: "Tulle with Floral Appliqué", inventoryQty: 2 },
            { sku: "CT-1004-M-IV", size: "M", color: "Ivory", fabric: "Tulle with Floral Appliqué", inventoryQty: 3 },
            { sku: "CT-1004-L-IV", size: "L", color: "Ivory", fabric: "Tulle with Floral Appliqué", inventoryQty: 1 }
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Ivory", hex: "#f8f4ee" }],
        fabric: "Tulle with Silver Floral Appliqué",
        silhouette: "Empire Waist A-Line",
        neckline: "Scoop",
        sleeve: "Sheer puff sleeve",
        embellishments: ["silver floral appliqué", "3D flower bursts", "vine embroidery"],
        careInstructions: "Dry clean only. Opera gloves included.",
        productionLeadTime: "6–8 weeks",
        measurements: {
            bust: { XS: 80, S: 84, M: 88, L: 92 },
            waist: { XS: 62, S: 66, M: 70, L: 74 }
        },
        isMadeToOrder: true,
        published: true
    },
    {
        title: "Ivory Royal Lace Ballroom Gown",
        slug: "ivory-royal-lace-ballroom-gown",
        sku: "CT-1005",
        shortDescription: "Ivory A-line ballroom gown with gold baroque lace overlay, sheer bell sleeves, and a cathedral-length train.",
        description: "<p>Fit for royalty, this ivory gown is enveloped in gold baroque lace appliqué from neckline to hem. The structured bodice features a square neckline with scalloped gold lace trim, while floor-sweeping sheer bell sleeves cascade in layers of gossamer tulle. The full A-line skirt flows into a dramatic train adorned with scrollwork and filigree lace motifs. Tiny sequins are scattered throughout, catching light with every movement.</p>",
        price: 315000,
        currency: "INR",
        categories: [],
        tags: ["ivory", "gold", "lace", "baroque", "bell-sleeve", "train", "bridal"],
        images: [
            { url: "/assets/gowns/ivory-royal-lace-ballroom-gown/ivory-royal-lace-ballroom-gown-wh.png", alt: "Ivory Royal Lace Ballroom Gown — front view on white background", type: "hero" },
            { url: "/assets/gowns/ivory-royal-lace-ballroom-gown/ivory-royal-lace-ballroom-gown.jpeg", alt: "Ivory Royal Lace Ballroom Gown — styled editorial shot", type: "zoom" }
        ],
        variants: [
            { sku: "CT-1005-XS-IL", size: "XS", color: "Ivory & Gold", fabric: "Tulle with Baroque Lace", inventoryQty: 1 },
            { sku: "CT-1005-S-IL", size: "S", color: "Ivory & Gold", fabric: "Tulle with Baroque Lace", inventoryQty: 2 },
            { sku: "CT-1005-M-IL", size: "M", color: "Ivory & Gold", fabric: "Tulle with Baroque Lace", inventoryQty: 2 },
            { sku: "CT-1005-L-IL", size: "L", color: "Ivory & Gold", fabric: "Tulle with Baroque Lace", inventoryQty: 1 }
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Ivory & Gold", hex: "#f5ead6" }],
        fabric: "Tulle with Baroque Lace Overlay",
        silhouette: "A-Line with Train",
        neckline: "Square with lace trim",
        sleeve: "Sheer bell sleeve",
        embellishments: ["baroque lace appliqué", "scrollwork", "filigree motifs", "scattered sequins"],
        careInstructions: "Professional dry clean only. Store flat.",
        productionLeadTime: "6–8 weeks",
        measurements: {
            bust: { XS: 82, S: 86, M: 90, L: 94 },
            waist: { XS: 62, S: 66, M: 70, L: 74 }
        },
        isMadeToOrder: true,
        published: true
    },
    {
        title: "Midnight Blue Draped Designer Evening Gown",
        slug: "midnight-blue-draped-designer-evening-gown",
        sku: "CT-1006",
        shortDescription: "Avant-garde midnight blue draped gown with exposed gold satin bodice and silver lace accents.",
        description: "<p>A daring fusion of modern sculpture and historical elegance. This midnight blue evening gown features dramatic asymmetric draping that wraps the body like a Grecian statue, revealing an inner bodice panel of burnished gold satin. Silver lace appliqué trails across the drape and hem like frost on stone. The structured shoulder line and bias-cut draping create a powerful, architectural silhouette that commands every room.</p>",
        price: 235000,
        currency: "INR",
        categories: [],
        tags: ["blue", "midnight", "draped", "gold", "asymmetric", "designer", "lace"],
        images: [
            { url: "/assets/gowns/midnight-blue-draped-designer-evening-gown/midnight-blue-draped-designer-evening-gown-wh.png", alt: "Midnight Blue Draped Designer Evening Gown — front view on white background", type: "hero" },
            { url: "/assets/gowns/midnight-blue-draped-designer-evening-gown/midnight-blue-draped-designer-evening-gown.jpeg", alt: "Midnight Blue Draped Designer Evening Gown — styled editorial shot", type: "zoom" }
        ],
        variants: [
            { sku: "CT-1006-XS-MB", size: "XS", color: "Midnight Blue & Gold", fabric: "Silk Chiffon & Satin", inventoryQty: 2 },
            { sku: "CT-1006-S-MB", size: "S", color: "Midnight Blue & Gold", fabric: "Silk Chiffon & Satin", inventoryQty: 2 },
            { sku: "CT-1006-M-MB", size: "M", color: "Midnight Blue & Gold", fabric: "Silk Chiffon & Satin", inventoryQty: 3 },
            { sku: "CT-1006-L-MB", size: "L", color: "Midnight Blue & Gold", fabric: "Silk Chiffon & Satin", inventoryQty: 1 }
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Midnight Blue", hex: "#1a1a5e" }, { name: "Gold", hex: "#b8860b" }],
        fabric: "Silk Chiffon & Satin",
        silhouette: "Draped Column",
        neckline: "Asymmetric",
        sleeve: "Cap shoulder",
        embellishments: ["silver lace appliqué", "architectural draping", "exposed inner panel"],
        careInstructions: "Dry clean only.",
        productionLeadTime: "4–6 weeks",
        measurements: {
            bust: { XS: 80, S: 84, M: 88, L: 92 },
            waist: { XS: 62, S: 66, M: 70, L: 74 }
        },
        isMadeToOrder: true,
        published: true
    },
    {
        title: "Navy Velvet Gothic Evening Gown",
        slug: "navy-velvet-gothic-evening-gown",
        sku: "CT-1007",
        shortDescription: "Deep navy velvet gothic gown with sapphire crystal brooch, ruched sweetheart bodice, and lace bell sleeves.",
        description: "<p>Dark romance incarnate. This floor-length navy velvet gown features a sweetheart neckline with ruched detailing, crowned by a dazzling sapphire crystal and rhinestone brooch at the centre décolletage. Full-length velvet sleeves terminate in dramatic pointed lace bell cuffs that trail like midnight shadows. The A-line skirt falls in rich, heavy folds of plush velvet. Rhinestone and crystal beadwork traces the neckline like frozen starlight.</p>",
        price: 275000,
        currency: "INR",
        categories: [],
        tags: ["navy", "velvet", "gothic", "sapphire", "crystal", "bell-sleeve", "dark-romance"],
        images: [
            { url: "/assets/gowns/navy-velvet-gothic-evening-gown/navy-velvet-gothic-evening-gown-wh.png", alt: "Navy Velvet Gothic Evening Gown — front view on white background", type: "hero" },
            { url: "/assets/gowns/navy-velvet-gothic-evening-gown/navy-velvet-gothic-evening-gown.jpeg", alt: "Navy Velvet Gothic Evening Gown — styled editorial shot", type: "zoom" }
        ],
        variants: [
            { sku: "CT-1007-XS-NV", size: "XS", color: "Navy", fabric: "Silk Velvet & Lace", inventoryQty: 2 },
            { sku: "CT-1007-S-NV", size: "S", color: "Navy", fabric: "Silk Velvet & Lace", inventoryQty: 3 },
            { sku: "CT-1007-M-NV", size: "M", color: "Navy", fabric: "Silk Velvet & Lace", inventoryQty: 2 },
            { sku: "CT-1007-L-NV", size: "L", color: "Navy", fabric: "Silk Velvet & Lace", inventoryQty: 1 }
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Navy", hex: "#0a0a3c" }],
        fabric: "Silk Velvet & Chantilly Lace",
        silhouette: "A-Line",
        neckline: "Sweetheart with rhinestone trim",
        sleeve: "Long with lace bell cuff",
        embellishments: ["sapphire crystal brooch", "rhinestone beading", "lace bell cuffs"],
        careInstructions: "Dry clean only. Avoid direct sunlight to preserve velvet nap.",
        productionLeadTime: "5–7 weeks",
        measurements: {
            bust: { XS: 82, S: 86, M: 90, L: 94 },
            waist: { XS: 62, S: 66, M: 70, L: 74 }
        },
        isMadeToOrder: true,
        published: true
    },
    {
        title: "Royal Gold Satin Ballroom Evening Gown",
        slug: "royal-gold-satin-ballroom-evening-gown",
        sku: "CT-1008",
        shortDescription: "Ivory pearl-encrusted satin mermaid gown with sweetheart neckline and dramatic ruched bodice.",
        description: "<p>Pure refined glamour. This ivory satin mermaid gown is sculpted to perfection with elegant ruching from bodice to hem, creating a fluid, figure-flattering silhouette. Wide shoulder straps encrusted with rows of hand-stitched freshwater pearls frame the sweetheart neckline. The gown flows into a graceful trumpet flare at the base, finishing with a pooling train. Every element speaks to masterful drapery and timeless bridal sophistication.</p>",
        price: 205000,
        currency: "INR",
        categories: [],
        tags: ["ivory", "satin", "pearl", "ruched", "mermaid", "sweetheart", "bridal"],
        images: [
            { url: "/assets/gowns/royal-gold-satin-ballroom-evening-gown.jpg/royal-gold-satin-ballroom-evening-gown-wh.png", alt: "Royal Gold Satin Ballroom Evening Gown — front view on white background", type: "hero" },
            { url: "/assets/gowns/royal-gold-satin-ballroom-evening-gown.jpg/royal-gold-satin-ballroom-evening-gown.jpeg", alt: "Royal Gold Satin Ballroom Evening Gown — styled editorial shot", type: "zoom" }
        ],
        variants: [
            { sku: "CT-1008-XS-IV", size: "XS", color: "Ivory", fabric: "Duchess Satin", inventoryQty: 2 },
            { sku: "CT-1008-S-IV", size: "S", color: "Ivory", fabric: "Duchess Satin", inventoryQty: 3 },
            { sku: "CT-1008-M-IV", size: "M", color: "Ivory", fabric: "Duchess Satin", inventoryQty: 2 },
            { sku: "CT-1008-L-IV", size: "L", color: "Ivory", fabric: "Duchess Satin", inventoryQty: 1 }
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Ivory", hex: "#f5f0e1" }],
        fabric: "Duchess Satin",
        silhouette: "Mermaid / Trumpet",
        neckline: "Sweetheart with pearl straps",
        sleeve: "Sleeveless (wide pearl straps)",
        embellishments: ["freshwater pearl straps", "ruching", "trumpet hem"],
        careInstructions: "Dry clean only.",
        productionLeadTime: "4–6 weeks",
        measurements: {
            bust: { XS: 80, S: 84, M: 88, L: 92 },
            waist: { XS: 60, S: 64, M: 68, L: 72 }
        },
        isMadeToOrder: true,
        published: true
    },
    {
        title: "Silver Embroidered Princess Net Evening Gown",
        slug: "silver-embroidered-princess-net-evening-gown",
        sku: "CT-1009",
        shortDescription: "Ethereal silver and gold beaded net ball gown with cap sleeves over a blush satin underlayer.",
        description: "<p>A fairytale brought to life. This showstopping princess ball gown features layer upon layer of silver and gold beaded net overlay on a blush satin base. The square-neck bodice is adorned with intricate scrollwork beading in silver, gold, and champagne tones, while cap sleeves delicately frame the shoulders. The full A-line skirt explodes in a symphony of baroque floral beadwork that catches every flicker of light. Designed for those who dare to be the centrepiece of any occasion.</p>",
        price: 345000,
        currency: "INR",
        categories: [],
        tags: ["silver", "gold", "beaded", "net", "princess", "ball-gown", "cap-sleeve"],
        images: [
            { url: "/assets/gowns/silver-embroidered-princess-net-evening-gown/silver-embroidered-princess-net-evening-gown-wh.png", alt: "Silver Embroidered Princess Net Evening Gown — front view on white background", type: "hero" },
            { url: "/assets/gowns/silver-embroidered-princess-net-evening-gown/silver-embroidered-princess-net-evening-gown.jpeg", alt: "Silver Embroidered Princess Net Evening Gown — styled editorial shot", type: "zoom" }
        ],
        variants: [
            { sku: "CT-1009-XS-SL", size: "XS", color: "Silver & Blush", fabric: "Beaded Net over Satin", inventoryQty: 1 },
            { sku: "CT-1009-S-SL", size: "S", color: "Silver & Blush", fabric: "Beaded Net over Satin", inventoryQty: 2 },
            { sku: "CT-1009-M-SL", size: "M", color: "Silver & Blush", fabric: "Beaded Net over Satin", inventoryQty: 2 },
            { sku: "CT-1009-L-SL", size: "L", color: "Silver & Blush", fabric: "Beaded Net over Satin", inventoryQty: 1 }
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Silver & Blush", hex: "#c0b8a8" }],
        fabric: "Beaded Net over Satin",
        silhouette: "Ball Gown",
        neckline: "Square",
        sleeve: "Cap sleeve",
        embellishments: ["silver & gold beadwork", "baroque scrollwork", "sequin overlay"],
        careInstructions: "Professional dry clean only. Handle with extreme care.",
        productionLeadTime: "8–10 weeks",
        measurements: {
            bust: { XS: 82, S: 86, M: 90, L: 94 },
            waist: { XS: 62, S: 66, M: 70, L: 74 }
        },
        isMadeToOrder: true,
        published: true
    }
];

module.exports = products;

