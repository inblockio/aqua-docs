interface StepsProps {
  children: React.ReactNode
}

interface StepProps {
  title: string
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-6 ml-4 space-y-6 [counter-reset:step]">
      {children}
    </div>
  )
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="relative pl-8 pb-6 border-l-2 border-border last:border-l-0 last:pb-0 [counter-increment:step] before:content-[counter(step)] before:absolute before:left-0 before:-translate-x-1/2 before:w-8 before:h-8 before:rounded-full before:bg-primary before:text-primary-foreground before:flex before:items-center before:justify-center before:text-sm before:font-semibold before:z-10">
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
