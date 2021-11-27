import dynamic from 'next/dynamic'

import { Content } from '../Layout/Content'

import { useAddressesQuery } from '../../hooks/useAddressesQuery'

import {
  Text, 
  Stack,  
  Button,
  Box,
  Flex,    
  Spinner,
  Heading,
  Skeleton,
  Spacer,  
  useDisclosure,
  Center,  
} from "@chakra-ui/react"

import { FiEdit } from 'react-icons/fi'

import { AddressFieldProps } from './components/AddressField'

const AddressField = dynamic<AddressFieldProps>(
  async () => {
    const { AddressField } = await import('./components/AddressField')
    
    return AddressField
  }
)
  
import { ModalProps } from '../Modal'

const Modal = dynamic<ModalProps>(
  async () => {
    const { Modal } = await import('../Modal')

    return Modal
  }
)

import { CreateAddressFormProps } from './components/CreateAddressForm'

const CreateAddressForm = dynamic<CreateAddressFormProps>(
  async () => {
    const { CreateAddressForm } = await import('./components/CreateAddressForm') 
       
    return CreateAddressForm
  }, {
    // eslint-disable-next-line react/display-name
    loading: () => (
      <Center mb="8">
        <Spinner color="blue.500" />
      </Center>
    )   
  }
)

type AddressesInformationProps = {
  userId: string | string[];
}
  
const AddressesInformation = ({ userId }: AddressesInformationProps) => {   
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addresses = useAddressesQuery(String(userId))

  const handleNewAddress = () => onOpen()

  if(addresses.isLoading || addresses.isFetching){
    return (
      <Content w="100%">
        <Flex align="center" mb="8">
          <Heading fontSize="2xl">Endereços</Heading>   
          <Spinner size="sm" color="gray.600" ml="4"/>
        </Flex>
        <Stack spacing={3}>
          <Skeleton h="14" borderRadius="8"/>
        </Stack>
      </Content>    
    )
  } 

  if(addresses.isError) {
    return (
      <Content w="100%">
        <Stack spacing={3}>
          <Heading fontSize="2xl">Endereços</Heading>
          <Text>Ocorreu um erro ao carregar os endereços. Volte e tente novamente...</Text>
        </Stack>
      </Content>    
    )
  }

  return (
    <>
      <Content w="100%">
        <Flex align='center' mb="8">
          <Heading fontSize="2xl">Endereços</Heading>
          <Spacer />
          <Button 
            colorScheme="blue" 
            leftIcon={<FiEdit />}
            onClick={handleNewAddress}
          >Novo endereço</Button>
        </Flex>
        <Box mb="8">
          <Stack spacing={3}>
            { addresses.data?.map(address => (
                  <AddressField key={address.id} address={address} />
                ))
            }
          </Stack>
        </Box>
      </Content>
      <Modal isOpen={isOpen} onClose={onClose} title="Novo endereço">
        <CreateAddressForm userId={String(userId)} onClose={onClose}/>
      </Modal>
    </>
  )
}

export { AddressesInformation }
