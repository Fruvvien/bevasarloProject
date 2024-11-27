import React, {useState, useEffect, useRef, SetStateAction} from "react";
import './todolist.css'

interface Product {
  id: number;
  name: string;
  amount: number;
  unit: string;
  bought: boolean;

}

function App(){
  const [product, setProduct] = useState<Product[]>([]);
  const [newList, setnewListName] = useState('');
  const [newAmount, setnewAmount] = useState(0);
  const [newUnit, setnewUnit] = useState('');
  const [error, setError] = useState('');
  const [allPurchased, setAllPurchased] = useState(false);
  const addItem = () => {
    if(newList.trim() === '' || newAmount <= 0 || newUnit.trim() === ""){
      setError("Minden mezőt kötelező kitölteni!");
      return;
    }
    if (newList.length > 30) {
      setError("A termék neve legfeljebb 30 karakter lehet!");
      return;
    }
    const oneProduct = product.filter(x => x.name ==newList);
    if(oneProduct.length != 0){
      setError("Nem lehet azonos item") 
      return
    }
    


    const newProduct : Product = {id: Date.now(), name: newList, amount: newAmount, unit: newUnit, bought: false};
    

    setProduct((prevProduct) => [...prevProduct, newProduct]);
    setnewListName('');
    setError('');
  }

  const removeTask = (productId : number) => {
    setProduct((prevProduct) => 
      prevProduct.filter((product) => product.id !== productId));
  };


  const toggleTaskCompletion = (productId: number) => {
    setProduct((prevProduct) => 
      prevProduct.map((product) => 
        product.id === productId ? {...product, bought : !product.bought} : product)
  )}

  useEffect(() => {
    setAllPurchased(product.length > 0 && product.every(item => item.bought));
  }, [product]);
  return (
  <>
    <div>
      <h2>Bevásárló lista</h2>
      <div id="inputs">
        <label htmlFor="">Terméknév</label>
        <input type="text" value={newList} onChange={(e) =>{ setnewListName(e.target.value)}} name="" id="" />
        <label htmlFor="">Mennyiség</label>
        <input type="number" value={newAmount} onChange={(e) =>{ setnewAmount(parseInt(e.target.value))}} name="" id="" />
        <label htmlFor="">Mennyiség egység</label>
        <input type="text" value={newUnit} onChange={(e) =>{ setnewUnit(e.target.value)}} name="" id="" />
        <button onClick={addItem}>Hozzáadás</button>
      </div>
       
      <div>
      {allPurchased && <div className="success">Az összes termék megvásárlásra került!</div>}
      </div>
      
     
      <p style={{ color: "red" }}>{error}</p>
      <ul>
          {product.map((item) => {
            const itemClass = `item ${item.bought ? "bought" : ""}`;
            return(
            <li key={item.id} className={itemClass}>
              <span style={{opacity: item.bought? "0.5": "1"}}>
              {item.name + " "+ item.amount + " " + item.unit}
             
              </span>
              <button onClick={() => toggleTaskCompletion(item.id)}>
                {item.bought ? "Visszaállítás": "Megvásárolva"}
              </button>
              <button onClick={() => removeTask(item.id)}>Törlés</button>
            </li>
        
            );
          })}
          {
            
          }
         
      </ul>
    </div>
   
  </>
  )
 
}
 
export default App
