const fs = require('fs');
const content = fs.readFileSync('components/header.tsx', 'utf-8');

const regex = /<button[\s\S]*?onClick=\{\(\) => setLoginOpen\(true\)\}[\s\S]*?\{user \? \([\s\S]*?\) : \([\s\S]*?<User className="w-4 h-4" \/>[\s\S]*?\)\}[\s\S]*?<\/button>/m;

const replacement = `{user ? (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="p-1 sm:px-4 sm:py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center sm:min-w-[80px] w-9 h-9 sm:w-auto sm:h-auto"
                >
                  <span className="flex items-center gap-2">
                    <span className="hidden sm:inline">{user.displayName || user.email?.split('@')[0] || t('common.user')}</span>
                    <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold text-primary-foreground sm:hidden">
                      {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || <User className="w-3 h-3" />}
                    </div>
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-foreground hover:bg-black/5 dark:text-white dark:hover:bg-white/10 transition-all active:scale-95 shrink-0"
                >
                  <User className="size-5" />
                </button>
              )}`;

if (regex.test(content)) {
  fs.writeFileSync('components/header.tsx', content.replace(regex, replacement));
  console.log('patched successfully');
} else {
  console.log('regex failed. here is the target section:');
  console.log(content.match(/<button[\s\S]*?onClick=\{\(\) => setLoginOpen\(true\)\}[\s\S]*?<\/button>/m)?.[0]);
}
