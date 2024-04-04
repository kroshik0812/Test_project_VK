import React, { useState } from 'react';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Input } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleShowImage = async () => {
    try {
      const response = await bridge.send('VKWebAppShowImages', {
        images: [imageUrl]
      });
      if (response.result) {
        console.log('Нативный экран открыт');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Panel id={id}>
      <Group header={<Header mode="secondary">Личные данные пользователя</Header>}>
        {fetchedUser && (
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        )}
        
        <Header mode="secondary">Показать изображение</Header>
        <Div>
          <Input type="url" value={imageUrl} onChange={handleChange} />
          </Div>
          <Div>
          <Button size="m" onClick={handleShowImage}>Показать изображение</Button>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
