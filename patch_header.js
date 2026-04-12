const fs = require('fs');
const content = fs.readFileSync('components/header.tsx', 'utf-8');

const regex = /{user \? \([\s\S]*?'Login'[\s\S]*?\)}/m;

const replacement = `{user ? (
                  <span className="flex items-center gap-2">
                    <span className="hidden sm:inline">{user.displayName || user.email?.split('@')[0] || t('common.user')}</span>
                    <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold text-primary-foreground sm:hidden">
                      {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || <User className="w-3 h-3" />}
                    </div>
                  </span>
                ) : (
                  <User className="w-4 h-4" />
                )}`;

if (regex.test(content)) {
  let newContent = content.replace(regex, replacement);
  // Also add conditional classes to the button
  newContent = newContent.replace('sm:min-w-[80px]"', 'sm:min-w-[80px] w-9 h-9 sm:w-auto sm:h-auto"');
  fs.writeFileSync('components/header.tsx', newContent);
  console.log('patched successfully');
} else {
  console.error('regex failed');
}
