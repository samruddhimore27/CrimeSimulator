import re

with open('src/index.css', 'r') as f:
    text = f.read()

# Remove the incorrectly placed directives
text = text.replace('@tailwind base;\n', '')
text = text.replace('@tailwind components;\n', '')
text = text.replace('@tailwind utilities;\n', '')

# Find the last @import statement
imports = [m for m in re.finditer(r'@import .*?;', text)]
if imports:
    last_import = imports[-1]
    insert_pos = last_import.end() + 1
    new_text = text[:insert_pos] + '\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' + text[insert_pos:]
else:
    new_text = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n' + text

with open('src/index.css', 'w') as f:
    f.write(new_text)

