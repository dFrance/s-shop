import styled from 'styled-components'

export const ContainerAuth = styled.form`
    max-width: 300px;
    height: 200px;
    margin: 0 auto;
    padding: 100px 32px;
    display: flex;
    gap: 16px;
    flex-direction: column;
    justify-content: 'center';
`;

export const Title = styled.span`
    font-family: 'Roboto', Helvetica, sans-serif;
    font-size: 24px;
    text-align: center;
    width: 100%;
`;

export const ErrorMessage = styled.span`
    font-family: 'Roboto', Helvetica, sans-serif;
    font-size: 14px;
    width: 100%;
    text-align: left;
`;