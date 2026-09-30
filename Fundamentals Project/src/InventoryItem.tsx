function InventoryItem(props: InventoryItemProps) {
    return (
        <>
            <h3 style={{marginBottom: '0rem'}}>Item Name: {props.name}</h3>
            <p>Value: {props.value}</p>
            <p>Description: {props.description}</p>
        </>
    )
}

type InventoryItemProps = {
    name: string
    value: number
    description: string
}

export default InventoryItem
export {type InventoryItemProps}