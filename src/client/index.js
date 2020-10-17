import { performAction} from './js/app'


import './styles/styles.scss'


/*Event listener*/
document.getElementById("generate").addEventListener("click", performAction);

export{
    performAction,
}