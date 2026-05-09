import {Oval} from "react-loader-spinner"

export default function Loader (){
    return <div className="flex justify-center items-center h-[400px]">
         <Oval 
            visible={true}
            height="80"
            width="80"
            color="#1E88E5"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
    />
    </div>
}

