import React from "react"
import { Counter } from "../../components/ui"

const Home = () => {
    return (
        <div className="w-full flex items-center justify-center flex-col">
            <h1 className="text-3xl font-bold">This is homepage</h1>
            <Counter />
        </div>
    )
}
export default Home