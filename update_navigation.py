python update_navigation.pyimport os
import re

def update_navigation(html_file):
    # Read the file
    with open(html_file, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if cart icon already exists
    if 'class="cart-icon"' in content:
        print(f"Skipping {html_file} - cart icon already exists")
        return
    
    # Add cart icon to navigation
    nav_pattern = r'(<li><a href="contact\.html" class="btn btn-primary">Contact Us</a></li>\s*</ul>)'
    replacement = r'<li><a href="contact.html">Contact Us</a></li>\n                <li class="cart-icon">\n                    <a href="cart.html">\n                        <i class="fas fa-shopping-cart"></i>\n                        <span class="cart-count">0</span>\n                    </a>\n                </li>\n            </ul>'
    
    new_content = re.sub(nav_pattern, replacement, content)
    
    # Add cart.css if not present
    if 'href="css/cart.css"' not in new_content:
        new_content = new_content.replace(
            '<link rel="stylesheet" href="css/styles.css">',
            '<link rel="stylesheet" href="css/styles.css">\n    <link rel="stylesheet" href="css/cart.css">'
        )
    
    # Add cart.js before main.js
    if 'src="js/cart.js"' not in new_content and 'src="js/main.js"' in new_content:
        new_content = new_content.replace(
            '<script src="js/main.js"></script>',
            '<script src="js/cart.js"></script>\n    <script src="js/main.js"></script>'
        )
    
    # Add cart initialization if not present
    if 'updateCartCount' not in new_content and '</body>' in new_content:
        new_content = new_content.replace(
            '</body>',
            '    <script>\n        // Initialize cart count on page load\n        document.addEventListener(\'DOMContentLoaded\', function() {\n            if (typeof updateCartCount === \'function\') {\n                updateCartCount();\n            }\n        });\n    </script>\n</body>'
        )
    
    # Write the updated content back to the file
    with open(html_file, 'w', encoding='utf-8') as file:
        file.write(new_content)
    
    print(f"Updated {html_file}")

def main():
    # Get all HTML files in the current directory
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'cart.html']
    
    for html_file in html_files:
        try:
            update_navigation(html_file)
        except Exception as e:
            print(f"Error processing {html_file}: {str(e)}")

if __name__ == "__main__":
    main()
