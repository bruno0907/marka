import { useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useUserQuery } from '../../hooks/useUserQuery'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { UserInformation } from '../../components/UserInformation'
import { UserAddresses } from '../../components/UserAddresses'

import {     
  Center,
  Spinner,
  VStack,
  Button,  
  Text,
  Box
} from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'
import { useReactToPrint } from 'react-to-print'
import { UserToPrint } from './components/UserToPrint'

export default function User() {  
  const router = useRouter()
  const id = router.query.id

  const userToPrintRef = useRef<HTMLDivElement>(null)
  
  const user = useUserQuery(id)

  const handlePrintUser = useReactToPrint({
    content: () => userToPrintRef.current
  })

  return (
    <>
      <Head>
        <title>MARCA | {user.data?.user.nome}</title>
      </Head>

      <Layout>

        <Header withGoBack title={user.data?.user.nome}>
          <Button
            colorScheme="blue"
            leftIcon={<FiPrinter />}
            onClick={handlePrintUser}
          >Imprimir</Button>
          </Header>

        <Divider />

        { !user.data || user.isLoading ? (
          <Center py="16">
            <Spinner size="lg" color="blue.500"/>
          </Center>
        ) : user.isError ? (          
          <Center py="16">
            <Text>Erro ao carregar as informações...</Text>
          </Center>
        ) : (
          <VStack spacing={3} align="flex-start">
            <UserInformation user={user.data.user} isFetching={user.isFetching}/>
            <UserAddresses addresses={user.data.addresses} isFetching={user.isFetching}/>          
          </VStack>
        )}
        
      </Layout>

      { user.data && <UserToPrint ref={userToPrintRef} user={user.data?.user} addresses={user.data?.addresses}/> }

    </>
  )
}
