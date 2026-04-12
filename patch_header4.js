const fs = require('fs');
const content = fs.readFileSync('components/header.tsx', 'utf-8');

const regex = /\{\/\* Login Button Button \*\/\}\s*<div className="relative">\s*<button\s*onClick=\{\(\) => setLoginOpen\(true\)\}\s*className="p-1 sm:px-4 sm:py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary\/90 transition-all shadow-sm flex items-center justify-center sm:min-w-\[80px\]"\s*>\s*\{user \? \(\s*<img src="\/apple-icon\.png" alt="User" className="w-6 h-6 object-contain" \/>\s*\) : \(\s*'Login'\s*\)\}\s*<\/button>\s*<\/div>/m;

const replacement = `{/* Login Button Button */}
            <div className="relative">
              {user ? (
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
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95 shrink-0 text-foreground"
                >
                  <User className="size-5" />
                </button>
              )}
            </div>`;

if (regex.test(content)) {
  fs.writeFileSync('components/header.tsx', content.replace(regex, replacement));
  console.log('patched successfully');
} else {
  console.log('RegEx failed.');
}
