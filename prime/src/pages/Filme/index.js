import { useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './filmeInfo.css';
import {toast} from 'react-toastify'

import api from '../../services/api';

function Filme(){

    const {id} = useParams();
    const navigate= useNavigate()

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "85ad32cb20468967bf25128a18acec69",
                    language: "pt-BR",
                }
            })
            .then((response)=> {
                setFilme(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch(()=>{
                console.log('Desculpa, mas não temos esse filme aqui!')
                navigate("/", {replace: true})
                return;
            })
        }

        loadFilme();

        return() =>{
            console.log('Voltando para inicial')
        }
    },[navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some ( (filmesSalvo) => filmesSalvo.id === filme.id)    

        if(hasFilme){
            toast.warning('Ei ei, este filme já está salvo')
            return;
        }   

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Seu filme foi salvo!')
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando os detalhes do filme...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="segunda foto a api"/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className='area-button'>
                <button onClick={salvarFilme}>Salvar este filme</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target='blank' rel="noreferrer"  >
                        Trailer do filme
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;

