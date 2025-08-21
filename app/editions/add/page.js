"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { createEdition } from "@/app/lib/api.js";

export default function AddEditionPage() {
  const router = useRouter();
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

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    try {
      await createEdition({
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
          <Image
            mah="60vh"
            src={
              form.thumbnail ? form.thumbnail : "https://placehold.co/800x1000"
            }
            height={rem(250)}
            alt="Thumbnail Preview"
            fit="contain"
            radius="md"
          />
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
            required
            label="Edition Link"
            placeholder="https://example.com"
            value={form.edition_link}
            onChange={(e) =>
              handleChange("edition_link", e.currentTarget.value)
            }
          />

          <TextInput
            required
            label="Published Date"
            type="date"
            value={form.published_at}
            onChange={(e) =>
              handleChange("published_at", e.currentTarget.value)
            }
          />

          <TextInput
            required
            label="Thumbnail URL"
            placeholder="https://example.com/image.png"
            value={form.thumbnail}
            onChange={(e) => handleChange("thumbnail", e.currentTarget.value)}
          />

          <Group position="right">
            <Button
              mt="1.7vh"
              color="primary.5"
              loading={saving}
              onClick={handleSave}
              fullWidth>
              Add Edition
            </Button>
          </Group>
        </Stack>
      </SimpleGrid>
    </Stack>
  );
}
