import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'
import { SuppliersList } from '../../components/SuppliersList'
import { Modal } from '../../components/Modal'
import { CreateSupplierForm } from '../../components/CreateSupplierForm'

import useDebounce from '../../hooks/useDebounce'

import {    
  Button,
  Icon,  
  Input,  
  InputGroup,
  InputLeftElement,  
  InputRightElement,
  useDisclosure,    
} from '@chakra-ui/react'

import { FiPlus, FiSearch, FiX } from 'react-icons/fi'

export default function Suppliers() {   
  const router = useRouter()
  
  const [searchValue, setSearchValue] = useState('')  
  
  const debouncedSearch = useDebounce(searchValue, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const handleClearFilter = () => setSearchValue('')

  return (
    <>
      <Head>
        <title>MARCA | Fornecedores</title>        
      </Head>

      <Layout>      

        <Header title="Fornecedores">
          <Button
            colorScheme="blue"            
            leftIcon={<Icon as={FiPlus}/>}
            onClick={() => router.push('/suppliers/new-supplier')}
          >
            Cadastrar novo fornecedor
          </Button>
        </Header>

        <Divider />

        <Content>    

          <InputGroup mb="8">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.500" />
            </InputLeftElement>
            <Input 
              placeholder="Digite sua pesquisa aqui..."
              borderColor="gray.300"
              value={searchValue}              
              onChange={handleChange}
            />
            { !!searchValue &&
              <InputRightElement 
                cursor="pointer" 
                onClick={handleClearFilter}
                _hover={{
                svg: {
                  color: 'gray.700'
                }
              }}>
                <Icon as={FiX} color="gray.500" fontSize="18px" />
              </InputRightElement>         
            }   
          </InputGroup>   

          <SuppliersList filterValue={debouncedSearch}/>

        </Content> 

      </Layout>
    </>
  )
}
