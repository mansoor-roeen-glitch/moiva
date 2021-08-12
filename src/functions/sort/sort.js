export default function sortList (list) {
    let unreleased = [];
    let sby = sortbyyear(JSON.parse(JSON.stringify(list)));

    sby.map((item, index) => {
        if (item.imDbRating === "") {
            unreleased.push(item)
        } 
    })
    sby = sby.filter(item => item.imDbRating !== "")
    list = list.filter(item => item.imDbRating !== "")

    let sbr = sortbyrating(JSON.parse(JSON.stringify(sby)));

    return {unreleased, sby, sbr, sbp: list}

}

const sortbyyear = (list) => {return list.sort((a, b) => {return parseInt(b.year) - parseInt(a.year)})}
const sortbyrating = (list) => {return list.sort((a, b) => {return parseFloat(b.imDbRating) - parseFloat(a.imDbRating)})}
