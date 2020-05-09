import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErros';
import { useToast } from '../../hooks/toast';
import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Senha obrigatória')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'No mínimo seis caracteres'),
        });
        await schema.validate(data, { abortEarly: false });
        await api.post('/users', data);
        history.push('/');
        addToast({
          type: 'success',
          title: 'Cadastro Realizado!',
          description: 'Você já pode fazer seu login no GoBarber',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description:
            'Ocorreu um erro ao fazer seu cadastro, tente novamente.',
        });
      }
    },
    [history, addToast],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu Cadastro</h1>
            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
            <Input name="email" icon={FiMail} type="text" placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
