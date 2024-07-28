interface Button {
  className?: string 
  children?: string | React.ReactNode
  handlerClick?: () => void
}

const Button = ({ children, className, handlerClick }: Button) => {

  return (
    <button onClick={handlerClick} className={className}>{children}</button>
  )
}

export default Button