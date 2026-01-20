import { useEffect } from "react"
import { ArrowLeftIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store"
import { fetchITResolverInitialData } from "@/features/it_resolver/itResolverThunks"
import { ResolversTable } from "./components/ResolversTable"
import { TicketsCard } from "./components/TicketsCard"
import AgentOutput from "./components/AgentOutput"

const ITResolver = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { resolvers, tickets, loading, isFetched } = useSelector(
    (state: RootState) => state.itResolver
  )

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchITResolverInitialData())
    }
  }, [dispatch, isFetched])

  return (
    <div className='h-full bg-white'>
      {loading && (
        <div className="absolute h-full w-full inset-0 z-10 bg-gray-200/50 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}

      <div className="bg-[#83b2ce]">
        <div className='container text-white py-5 text-center font-bold text-xl flex items-center justify-between'>
          <Link to="/" className='group text-white hover:bg-white p-2 rounded-full transition-all duration-300'>
            <ArrowLeftIcon className='w-6 h-6 group-hover:text-[#83b2ce]' />
          </Link>
          <h2>IT Resolver</h2>
          <span></span>
        </div>
      </div>

      <div className='container mx-auto mt-5'>
        <Tabs defaultValue="resolvers" className="w-full" >
          <div className='flex justify-between items-center'>
            <TabsList className='w-fit'>
              <TabsTrigger value="resolvers" className='w-fit bg-white'>Resolvers</TabsTrigger>
              <TabsTrigger value="tickets" className='w-fit bg-white'>Tickets</TabsTrigger>
            </TabsList>
            <AgentOutput />
          </div>
          <TabsContent value="resolvers" className='pb-10'>
            <ResolversTable data={resolvers} />
          </TabsContent>
          <TabsContent value="tickets" className='pb-10'>
          <TicketsCard tickets={tickets} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ITResolver