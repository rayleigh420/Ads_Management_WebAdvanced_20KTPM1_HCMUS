import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './CounterSlice'
import { RootState } from '../../../store'
import './Counter.scss'
import { Button } from 'antd'

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div className='p-10'>
            <div className='flex gap-6 items-center'>
                <Button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </Button>
                <span>{count}</span>
                <Button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </Button>
            </div>
        </div>
    )
}

export default Counter