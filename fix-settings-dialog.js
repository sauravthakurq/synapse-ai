const fs = require('fs');

let f = fs.readFileSync('components/settings/index.tsx', 'utf8');

const oldTarget = `    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="h-[100dvh] w-screen max-w-none rounded-none border-none sm:rounded-xl sm:border sm:max-w-none sm:w-[85vw] lg:max-w-5xl sm:h-[85vh] p-0 gap-0 block"
        showCloseButton={false}
      >`;

const newTarget = `    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="h-[100dvh] w-screen max-w-none rounded-none border-none sm:rounded-xl sm:border sm:max-w-none sm:w-[85vw] lg:max-w-5xl sm:h-[85vh] p-0 gap-0 block"
        showCloseButton={false}
      >`;

f = f.replace(oldTarget, newTarget);

const oldMiddle = `        </div>
      </DialogContent>

      {/* Edit Model Dialog */}
      <ModelEditDialog`;

const newMiddle = `        </div>
      </DialogContent>
    </Dialog>

      {/* Edit Model Dialog */}
      <ModelEditDialog`;

f = f.replace(oldMiddle, newMiddle);

const oldEnd = `      </AlertDialog>
    </Dialog>
  );
}`;

const newEnd = `      </AlertDialog>
    </>
  );
}`;

f = f.replace(oldEnd, newEnd);

fs.writeFileSync('components/settings/index.tsx', f);
