import { useParams } from "react-router-dom";
function DetailToko() {
//     const url = new URL(window.location.href);
// const yourParamName = url.searchParams.get('idtoko');
let { idtoko }=useParams();
let toko= idtoko;
console.log(idtoko);
   
    
      return (
        <div className="Toko">
          <header className="App-header">
           
            <p>Belajar hitung{        
           toko
              }</p>
          </header>
        </div>
      );
    }
    
    export default DetailToko;