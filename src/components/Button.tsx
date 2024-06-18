import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        'rounded-md bg-zinc-100 px-4 py-2 text-sm text-black transition-all duration-300 hover:bg-zinc-300',
        className,
      )}
    />
  )
})
