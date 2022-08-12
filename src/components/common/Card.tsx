import { Card, Image, Text, Badge, Button, Group, Grid } from "@mantine/core";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { Edit, Trash } from "tabler-icons-react";
import CreatePost from "./CreatePost";
import ModalComponent from "./Modal";
import { handleDelete } from "./Residents";

export default function CardComponent({
  type = "post",
  id,
  headText,
  bodyText,
  time,
  label = "notice",
  status = null,
}: any) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [heading, setHeading] = useState(headText);
  const [statuses, setStatus] = useState(status);
  const [description, setDescription] = useState(bodyText);
  return (
    <Grid.Col span={4} style={{ minHeight: 200 }}>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{headText}</Text>
          <Badge color="pink" variant="light">
            {time.slice(0, 10)}
          </Badge>
          {status && (
            <Badge
              color={
                status === "resolved"
                  ? "teal"
                  : status === "unresolved"
                  ? "red"
                  : "pink"
              }
              variant="light"
            >
              {status}
            </Badge>
          )}
        </Group>

        <Text size="sm" color="dimmed">
          {bodyText}
        </Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Edit
            onClick={() => {
              setEditing(true);
              console.log({ id });
            }}
            style={{
              cursor: "pointer",
            }}
          />
          <Trash
            onClick={() =>
              handleDelete(
                `/api/deleteRow?tableName=${label}&id=${id}`,
                label,
                queryClient
              )
            }
            style={{
              cursor: "pointer",
            }}
          />
        </div>
      </Card>
      <ModalComponent open={editing} setOpen={setEditing}>
        <CreatePost
          heading={heading}
          setHeading={setHeading}
          description={description}
          setDescription={setDescription}
          label={`Edit ${label}`}
          type={`edit ${label}`}
          subType={label}
          id={id}
          status={statuses}
          setStatus={setStatus}
        />
      </ModalComponent>
    </Grid.Col>
  );
}
