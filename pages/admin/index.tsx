import CardComponent from "@/components/common/Card";
import { Card, Grid } from "@mantine/core";
import { Image, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Index = () => {
  return (
    <>
      <Demo />
    </>
  );
};

export default Index;

const Demo = () => {
  return (
    <>
      <Card shadow="sm" p="xl" component="a" href="/admin/notices">
        <Card.Section>
          <Image
            src="https://images.template.net/wp-content/uploads/2017/05/fimg-notice1.jpg?width=584"
            height={320}
            alt="No way!"
            fit="cover"
          />
        </Card.Section>

        <Text weight={700} size="xl" mt="md">
          Notices
        </Text>

        <Text mt="xs" color="dimmed" size="sm">
          Please click anywhere on this card to claim your reward, this is not a
          fraud, trust us
        </Text>
      </Card>
      <Card shadow="sm" p="xl" component="a" href="/admin/complaints">
        <Card.Section>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdbU18MjuUbKPxeO6IDC5dYLGQYuJEHFAn8w&usqp=CAU"
            height={320}
            alt="No way!"
            fit="cover"
          />
        </Card.Section>

        <Text weight={700} size="xl" mt="md">
          Complaints
        </Text>

        <Text mt="xs" color="dimmed" size="sm">
          Please click anywhere on this card to claim your reward, this is not a
          fraud, trust us
        </Text>
      </Card>
    </>
  );
};
