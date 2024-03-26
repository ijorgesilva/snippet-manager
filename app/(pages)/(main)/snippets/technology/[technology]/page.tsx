export default function TechnologyPage(p: { params : { technology: string }}){
  return <div className="text-white"> {p.params.technology} </div>
}