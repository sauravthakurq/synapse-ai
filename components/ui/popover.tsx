'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

const Popover = ({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) => {
  const { open, onOpenChange } = props;

  const onOpenChangeRef = React.useRef(onOpenChange);
  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  React.useEffect(() => {
    if (!open) return;

    const id = Math.random().toString(36).substring(2, 9);
    let isPopping = false;
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.popoverId === id) {
        return;
      }
      isPopping = true;
      e.preventDefault();
      onOpenChangeRef.current?.(false);
    };

    window.history.pushState({ popoverId: id }, '');
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (!isPopping && window.history.state?.popoverId === id) {
        window.history.back();
      }
    };
  }, [open]);

  return <PopoverPrimitive.Root {...props} />;
};

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={16}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
