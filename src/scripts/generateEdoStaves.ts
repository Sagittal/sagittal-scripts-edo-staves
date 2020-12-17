import {buildStaffCode, downloadSvg, translateInputToDisplay} from "staff-code"

const root = buildStaffCode()
const input = root.querySelector("textarea")!
input.value = `
st tbcf ; 
c4 nt ; /| ; nt ; 
d4 \\! ; nt ; nt ; /| ; nt ; 
f4 \\! ; nt ; nt ; /| ; nt ;
g4 \\! ; nt ; nt ; /| ; nt ;
a4 \\! ; nt ; nt ; /| ; nt ;
c5 \\! ; nt ; nt ;
`
translateInputToDisplay(root)
downloadSvg()
