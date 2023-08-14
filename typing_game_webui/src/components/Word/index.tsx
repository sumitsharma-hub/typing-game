
type Props = {
    text:string,
    active:boolean,
    correct:boolean | null, 
}

const Word = (props: Props) => {
    const { text,active,correct }=props;
    if(correct){
        return <span className="correct font-semibold text">{text}{" "}</span>
    }
    if(!correct){
        return <span className="incorrect mb-2 text-2xl font-light-green-500 bg-inherit tracking-tight text-red-500 dark:text-white">{text }{" "}</span>
    }
    if(active){
        return <span className="active mb-2 text-2xl font-light bg-inherit tracking-tight text-green-500 ">{text}</span>
    }
  return (
    <span>{text}</span>
  )
}

export default Word