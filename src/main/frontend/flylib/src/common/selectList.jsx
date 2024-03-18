import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./selectList.css"
export default function SelectList ({endpoint, setSelectOptionValue}) {
    //Get data from DB
    const token = Cookies.get("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const [selectListData, setSelectListData] = useState([])
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/${endpoint}`, config)
            .then((response) => {
                console.log(response.data);
                setSelectListData(response.data);
            })
            .catch((error) => {
                console.log('Axios request error: ', error);
            });
    }, []);

    //Const for selected value
    return(
            <select className="select-type"
                onChange={e => setSelectOptionValue(e.target.value)}
            >
                {selectListData.map((type) =>
                    <option key={type.id} value={type.name}>{type.name}</option>
                )}
            </select>
    )

}