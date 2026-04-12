with open("components/roundtable/index.tsx", "r") as f:
    content = f.read()

content = content.replace(
    '               </motion.div>\n              ))}\n',
    '               </motion.div>\n              ))}\n            </div>\n'
)

with open("components/roundtable/index.tsx", "w") as f:
    f.write(content)
