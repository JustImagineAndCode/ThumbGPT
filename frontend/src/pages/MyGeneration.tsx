import { useEffect, useState } from "react"
import BackDrops from "../components/BackDrops"
import { dummyThumbnails, type IThumbnail } from "../../public/assets/assets"
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRightIcon, DownloadIcon, Trash2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../config/api";
import toast from "react-hot-toast";


function MyGeneration() {
  const {isLoggedIn} = useAuth();
const navigate =useNavigate();
  const aspectRatioClassMap : Record<string ,string> ={
        '16:9' : 'aspect-video',
        '1:1' :  'aspect-square',
        '9:16' : 'aspect-[9/16]'
  }

  const [thumbnails , setThumbnails] = useState <IThumbnail[]>([]);
  const [loading , setLoading ] = useState(false);

  const fetchThumbnails = async ()=> {
   
              try {
                setLoading(true)
                const {data} = await api.get('/api/user/thumbnails')
                setThumbnails(data.thumbnails || [])

              } catch (error:any) {
                console.error(error);
                toast.error(error?.response?.data?.message || error.message)
              }
              finally{
                setLoading(false)
              }
  
                  //fetching dummy data//
    // setThumbnails(dummyThumbnails as unknown as IThumbnail[]);
    // setLoading(false);
  }

  const handleDownload = (image_url:string) => {
     const link = document.createElement('a');
        link.href = image_url.replace('/upload' , '/upload/f1_attachment' )
        document.body.appendChild(link);
        link.click()
        link.remove()
  }

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm('Are you confirm to delete this thumbnail ? ')
      if(!confirm) return;
      const {data}= await api.delete(`/api/thumbnail/delete/${id}`)
      toast.success(data.message)
      setThumbnails(thumbnails.filter((t)=> t._id !== id))

    } catch (error:any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(()=>{
    if(isLoggedIn){
      fetchThumbnails();
    }
    
  },[])
  return (
    <>
    <BackDrops/>
    <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
                      {/**Header */}

        <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-200"> My Generation</h1>
            <p className="text-sm  text-gray-400 mt-1">View and manage all your AI-generated Thumbnails.</p> 
        </div>

        {/**Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length:6}).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]"/>
            ))} 
            </div>
        )}
        {/**EMPTY STATE */}
        {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24"> 
          <h3 className="text-lg font-semibold text-zinc-200">No thumbnail yet</h3>
          <p className="text-sm text-zinc-400 mt-2"> Generate your first thumbnail to see it here</p>
          </div>
        )}
        {/**Gridd */}
        {!loading && thumbnails.length > 0 && (
          <div className="column-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
            {thumbnails.map((thumb: IThumbnail) => {
              const aspectClass = aspectRatioClassMap[thumb.aspect_ratio || '16:9']
              return (
                <div key={thumb._id} onClick={()=> navigate(`/generate/${thumb._id}`)} className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid">
                  {/**Image */}
                  <div className = {`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}>
                    {thumb.image_url ? (
                      <img src={thumb.image_url} alt={thumb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/> ):
                      (
                        <div className="w-full h-full flex items-center justify-center text-sm text-zinc-400">
                          {thumb.isGenerating ? 'Generating..' : 'No image'}
                          </div>
                      )}
                      {thumb.isGenerating && <div className="absolute inset-0 bg-black/50 flex items-center justify-center 
                      text-sm font-medium text-white">Generating...</div>}
                  </div>

                  {/**Content */}
                  <div className=" p-4 space-y-2">
                    
                    <h3 className=" text-sm font-semibold text-zinc-100 line-clamp-2">{thumb.title}</h3>
                   <div className="flex flex-wrap gap-2 text-xs text-zinc-100 line-clamp-2">
                    <span className="px-2 py-0.5 rounded bg-white/8">{thumb.style}</span>
                    <span className="px-2 py-0.5 rounded bg-white/8">{thumb.aspect_ratio}</span>
                    <span className="px-2 py-0.5 rounded bg-white/8">{thumb.color_scheme}</span>
                    
                   </div>
                   
                    <p className=" text-xs text-zinc-500">{new Date(thumb.createdAt!).toDateString()}</p>
                  </div>
                          <div onClick={(e)=>e.stopPropagation()} className="absolute bottom-2 right-2 z-10 flex gap-1.5 opacity-100 transition-opacity duration-200">
                            <Trash2Icon onClick={()=> handleDelete(thumb._id)}
                            className="size-6 cursor-pointer bg-black/50 p-1 rounded hover:bg-pink-500 transition-all text-white"/>

                            <DownloadIcon onClick={()=> handleDownload(thumb.image_url!)}
                            className="size-6 cursor-pointer bg-black/50 p-1 rounded hover:bg-pink-500 transition-all text-white"/>
                          <Link target="_blank" to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`} className="flex items-center justify-center">
                            <ArrowUpRightIcon className="size-6 bg-black/50 p-1 rounded hover:bg-pink-500 transition-all text-white"/> 
                          </Link>
                          </div>
                </div>
              )
            })}
          </div>
        )}
    </div>
    </>
  )
}

export default MyGeneration