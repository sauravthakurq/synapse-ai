const fs = require('fs');

let f = fs.readFileSync('components/generation/generation-toolbar.tsx', 'utf8');

// Level 1 target
const l1Target = `        {/* Level 1: Provider list */}
        {!drillProvider && (
          <div className="max-h-72 overflow-y-auto">`;

const l1Replace = `        {/* Level 1: Provider list */}
        <div className={cn("max-h-72 overflow-y-auto", drillProvider ? "hidden" : "block")}>`;

f = f.replace(l1Target, l1Replace);

const l1EndTarget = `              );
            })}
          </div>
        )}`;

const l1EndReplace = `              );
            })}
          </div>`;

f = f.replace(l1EndTarget, l1EndReplace);

// Level 2 target
const l2Target = `        {/* Level 2: Model list for selected provider */}
        {drillProvider && activeProvider && (
          <div className="max-h-72 overflow-y-auto">`;

const l2Replace = `        {/* Level 2: Model list for selected provider */}
        <div className={cn("max-h-72 overflow-y-auto", (!drillProvider || !activeProvider) ? "hidden" : "block")}>`;

f = f.replace(l2Target, l2Replace);

// We need to carefully replace the end of Level 2, so let's match the closing div and brace of {drillProvider && activeProvider && (
const l2EndTarget = `                </button>
              );
            })}
          </div>
        )}
      </PopoverContent>`;

const l2EndReplace = `                </button>
              );
            })}
          </div>
      </PopoverContent>`;

f = f.replace(l2EndTarget, l2EndReplace);

fs.writeFileSync('components/generation/generation-toolbar.tsx', f);
console.log("Replaced generation-toolbar!");
