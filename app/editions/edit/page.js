"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  TextInput,
  NumberInput,
  Chip,
  Flex,
  Button,
  Stack,
  Group,
  Notification,
  rem,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { AlertCircle } from "lucide-react";
import { fetchEditionById, updateEdition } from "@/app/lib/api.js";
import { Loading } from "@/components/Loading";

export default function EditEditionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    edition_id: 1,
    status: "1",
    edition_link: "",
    published_at: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetchEditionById(id)
      .then((e) =>
        setForm({
          name: e.name,
          edition_id: e.edition_id,
          status: String(e.status),
          edition_link: e.edition_link,
          published_at: e.published_at.slice(0, 10),
          thumbnail: e.thumbnail,
        })
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await updateEdition(id, {
        ...form,
        edition_id: Number(form.edition_id),
        status: Number(form.status),
      });
      router.push("/editions");
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  if (loading) return <Loading />;

  return (
    <Stack spacing="xl" p="xl" style={{ margin: "0 20px" }}>
      {error && (
        <Notification
          icon={<AlertCircle />}
          color="red"
          onClose={() => setError("")}>
          {error}
        </Notification>
      )}

      <Button variant="outline" onClick={() => router.back()} mb="xl">
        Back
      </Button>

      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} spacing="xl">
        <Stack spacing="md" align="center">
          {form.thumbnail && (
            <Image
              mah="60vh"
              src={form.thumbnail}
              height={rem(250)}
              alt="Thumbnail Preview"
              fit="contain"
              radius="md"
            />
          )}
        </Stack>
        <Stack spacing="md" align="stretch">
          <TextInput
            label="Edition Name"
            placeholder="Enter edition name"
            value={form.name}
            onChange={(e) => handleChange("name", e.currentTarget.value)}
            required
          />
          <NumberInput
            label="Edition ID"
            min={1}
            value={form.edition_id}
            onChange={(val) => handleChange("edition_id", val || 1)}
            required
          />

          <Flex
            align="baseline"
            mt="2vh"
            direction="row"
            gap="lg"
            justify="center"
            wrap="wrap">
            <span>Status:</span>
            <Chip.Group
              value={form.status}
              onChange={(val) => handleChange("status", val)}
              multiple={false}
              spacing="sm">
              <Chip value="1" color="primary.5" size="xs">
                Published
              </Chip>
              <Chip value="0" color="red.4" size="xs">
                Draft
              </Chip>
            </Chip.Group>
          </Flex>
        </Stack>

        <Stack spacing="md" align="stretch">
          <TextInput
            label="Edition Link"
            placeholder="https://example.com"
            value={form.edition_link}
            onChange={(e) =>
              handleChange("edition_link", e.currentTarget.value)
            }
          />

          <TextInput
            label="Published Date"
            type="date"
            value={form.published_at}
            onChange={(e) =>
              handleChange("published_at", e.currentTarget.value)
            }
          />

          <Group position="right">
            <Button
              mt="1.7vh"
              color="primary.5"
              loading={saving}
              onClick={handleSave}
              fullWidth>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </SimpleGrid>
    </Stack>
  );
}
