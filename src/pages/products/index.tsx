import { useState, ChangeEvent } from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Modal } from '../../components/Modal'
import { ProductsList } from '../../components/ProductsList'
import { CreateProductForm } from '../../components/CreateProductForm'

import useDebounce from '../../hooks/useDebounce'

import { 
  Button,
  Icon,  
  useDisclosure,    
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,  
} from '@chakra-ui/react'

import { FiPlus, FiSearch, FiX } from 'react-icons/fi'

export default function Products() {
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
        <title>MARCA | Produtos</title>        
      </Head>

      <Layout>

        <Header title="Produtos">          
          <Button              
            colorScheme="blue"            
            leftIcon={<Icon as={FiPlus} />}
            onClick={() => router.push('/products/new-product')}
          >
            Cadastrar novo produto
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

          <ProductsList filterValue={debouncedSearch}/>

        </Content>
      </Layout>
    </>
  )
}
