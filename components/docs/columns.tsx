interface ColumnsProps {
  children: React.ReactNode
  cols?: {
    sm?: 1 | 2 | 3 | 4
    md?: 1 | 2 | 3 | 4
    lg?: 1 | 2 | 3 | 4
    xl?: 1 | 2 | 3 | 4
  }
}

export function Columns({ children, cols = { sm: 1, md: 2, lg: 3 } }: ColumnsProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }

  const smClass = cols.sm ? colClasses[cols.sm] : "grid-cols-1"
  const mdClass = cols.md ? `md:${colClasses[cols.md]}` : ""
  const lgClass = cols.lg ? `lg:${colClasses[cols.lg]}` : ""
  const xlClass = cols.xl ? `xl:${colClasses[cols.xl]}` : ""

  return (
    <div className={`grid ${smClass} ${mdClass} ${lgClass} ${xlClass} gap-4 my-6`}>
      {children}
    </div>
  )
}

interface ColumnProps {
  children: React.ReactNode
  span?: 1 | 2 | 3 | 4
}

export function Column({ children, span = 1 }: ColumnProps) {
  const spanClass = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
  }

  return <div className={spanClass[span]}>{children}</div>
}
