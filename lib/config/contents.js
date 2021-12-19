import { scavengeWasteland } from '../action/playerActions.js'

export const playerActionList = [
    {title: "Scavenge Wasteland", render: true, reference: "scavengeWasteland"}
]

export const menuList = [
    {title: "Outpost", render: true},
    {title: "Science", render: false},
    {title: "Tech", render: false},
    {title: "Storage", render: false}
]

export const baseResourceList = [
    {title: "Scrap", render: true},
    {title: "Iron ore", render: false}
]

export const buildingList = [
    {title: "Scavenger Drone", render: true},
    {title: "Miner Drone", render: false}
]

export const actionMap = {
    "scavengeWasteland": scavengeWasteland
}