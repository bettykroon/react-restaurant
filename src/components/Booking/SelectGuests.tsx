export function SelectGuests() {
    let minGuests = 0;
    let list: number[] = [];

    while(minGuests < 90){
        minGuests += 1;
        list.push(minGuests);
    }

    let options = list.map((lis, i) => {
        return(<option key={i}>{lis}</option>)
    })

    return(<>{options}</>)
}