import type { PriorityValues, PriorityContent } from "../types"

interface PriorityOption {
    value: PriorityValues,
    content: PriorityContent
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: PriorityOption[]

}

export default function Select({ options, ...props }: SelectProps) {

    return (<select {...props}>
        <option value='' disabled>Приоритет</option>
        {options.map((item) => <option value={item.value} key={item.value}>{item.content}</option>)}
    </select>)

}