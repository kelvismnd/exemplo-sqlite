import {Alert, Button, Text, View} from 'react-native'
import { Input } from './components/Input'
import { useState } from 'react'
import { useProductDatabase } from '@/database/useProductDatabase';

export default function Index(){

    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const [quantity,setQuantity] = useState("");
    const [produtos,setProdutos] = useState([]);

   
    const productDatabase = useProductDatabase()

    async function create(){
        try{
            if(isNaN(Number(quantity))){
                return Alert.alert("Quantidade precisa ser um numero")
            }
            const valor = Number(quantity)
            const response =await productDatabase.create({name:name,quantity:valor})
            Alert.alert("Produto cadastro com id",response.insertedRowId)
        }catch(error){
            console.log("error",error)

        }
    }

    return(
        <View style={{flex:1,justifyContent:'center',paddingHorizontal:32,gap:16}}>
            <Input placeholder='Nome' onChangeText={setName} value={name}/>            
            <Input placeholder='Quantidade' onChangeText={setQuantity} value={quantity}/>    
            <Button title='Salvar' onPress={create}/>        
        </View>

    )
}