import axios from "axios"


function AvatarPicker(props) {

    const avatars = ["/bird.svg",
    "/dog.svg",
    "/fox.svg",
    "/frog.svg",
    "/lion.svg",
    "/owl.svg",
    "/tiger.svg",
    "/whale.svg"]

    function selectAvatar(event) {
        let avatarList = document.getElementsByClassName("avatar")
        let id = event.target.id
        
        for (let i = 0; i < avatarList.length; i++) {
            avatarList[i].style.border = ""
            
        }

        document.getElementById(id).style.border = "2px solid black"
        console.log(event.target.getAttribute("src"))
        props.pickAvatar(event.target.getAttribute("src"))
    }

    return (
        <div>
            {avatars.map((avatar) => <img className="avatar" id={avatars.indexOf(avatar)} key={avatar} src={avatar} height="100px" onClick={selectAvatar}/>)}
        </div>
    )
}

export default AvatarPicker