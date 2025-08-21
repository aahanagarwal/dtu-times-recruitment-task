"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Notification,
  rem,
  Affix,
  TextInput,
  Select,
  NumberInput,
} from "@mantine/core";
import { AlertCircle, Plus } from "lucide-react";
import { fetchEditions, deleteEdition } from "@/app/lib/api.js";
import { Loading } from "@/components/Loading";

export default function EditionsPage() {
  const router = useRouter();
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(undefined);
  const [sortBy, setSortBy] = useState("published_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const loadEditions = async () => {
    setLoading(true);
    try {
      const data = await fetchEditions({
        search,
        status,
        sortBy,
        order,
        page,
        limit,
      });
      setEditions(data.results);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEditions();
  }, [search, status, sortBy, order, page, limit]);

  const handleDelete = async (id) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }
    try {
      await deleteEdition(id);
      setEditions(editions.filter((e) => e._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <Stack spacing="xl" p="xl">
      {error && (
        <Notification
          icon={<AlertCircle />}
          color="red"
          onClose={() => setError("")}>
          {error}
        </Notification>
      )}

      <SimpleGrid
        cols={{ base: 2, xs: 3, md: 6 }}
        spacing="xl"
        mb="xl"
        verticalSpacing="md">
        {[
          <TextInput
            placeholder="Search by name"
            label=" "
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />,
          <Select
            label="Status"
            placeholder="All"
            data={[
              { value: "1", label: "Published" },
              { value: "0", label: "Draft" },
            ]}
            value={status}
            onChange={setStatus}
          />,
          <Select
            label="Sort by"
            data={[
              { value: "name", label: "Name" },
              { value: "edition_id", label: "Edition ID" },
              { value: "published_at", label: "Published At" },
            ]}
            value={sortBy}
            onChange={setSortBy}
          />,
          <Select
            label="Order"
            data={[
              { value: "asc", label: "Ascending" },
              { value: "desc", label: "Descending" },
            ]}
            value={order}
            onChange={setOrder}
          />,
          <NumberInput
            label="Page"
            min={1}
            value={page}
            onChange={(val) => setPage(val || 1)}
          />,
          <NumberInput
            label="Limit"
            min={1}
            value={limit}
            onChange={(val) => setLimit(val || 12)}
          />,
        ].map((input, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "center",
              width: "80%",
            }}>
            {input}
          </div>
        ))}
      </SimpleGrid>

      <SimpleGrid
        cols={{ base: 1, xs: 2, md: 3, lg: 4, xl: 5 }}
        spacing={{ base: "xl" }}>
        {editions.map((edition) => (
          <Card
            key={edition._id}
            p="lg"
            withBorder
            style={{
              borderColor: edition.status ? "green" : "red",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}>
            <Card.Section>
              <Image
                src={edition.thumbnail}
                alt={edition.name}
                fit="fill"
                h={rem(350)}
              />
            </Card.Section>

            <Stack spacing="xs" mt="sm">
              <Group position="apart">
                <Text weight={700} size="lg">
                  {edition.name}
                </Text>
                <Badge color={edition.status ? "green" : "red"} variant="light">
                  {edition.status ? "Published" : "Draft"}
                </Badge>
              </Group>

              <Text size="sm" lineClamp={3}>
                Edition ID: {edition.edition_id} <br />
                Published: {new Date(edition.published_at).toLocaleDateString()}
              </Text>

              <Group spacing="sm" mt="md">
                <Button
                  color="primary.5"
                  variant="light"
                  fullWidth
                  onClick={() =>
                    router.push(`/editions/edit?id=${edition._id}`)
                  }>
                  Edit
                </Button>

                <Button
                  color={deleteConfirm === edition._id ? "red" : "gray"}
                  variant={deleteConfirm === edition._id ? "filled" : "outline"}
                  fullWidth
                  onClick={() => handleDelete(edition._id)}>
                  {deleteConfirm === edition._id ? "Confirm Delete" : "Delete"}
                </Button>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Affix right="5vw" bottom="4.5vw">
        <Button
          color="primary.5"
          variant="filled"
          onClick={() => router.push("/editions/add")}
          size="sm"
          leftSection={<Plus size="18px" />}>
          Add an edition
        </Button>
      </Affix>
    </Stack>
  );
}
