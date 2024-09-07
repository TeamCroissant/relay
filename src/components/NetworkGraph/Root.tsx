"use client";

import {
    FullScreenControl,
    SigmaContainer,
    ZoomControl,
} from "@react-sigma/core";
import { createNodeImageProgram } from "@sigma/node-image";
import { DirectedGraph } from "graphology";
import { constant, keyBy, mapValues, omit } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Settings } from "sigma/settings";
import { drawHover, drawLabel } from "../../lib/canvas-utils";
import { Dataset, FiltersState } from "../../lib/types";
import ClustersPanel from "./ClustersPanel";
import DescriptionPanel from "./DescriptionPanel";
import GraphDataController from "./GraphDataController";
import GraphEventsController from "./GraphEventsController";
import GraphSettingsController from "./GraphSettingsController";
import SearchField from "./SearchField";
import TagsPanel from "./TagsPanel";
import {
    BookmarkFilledIcon,
    Cross1Icon,
    EnterFullScreenIcon,
    ExitFullScreenIcon,
    TargetIcon,
    ZoomInIcon,
    ZoomOutIcon,
} from "@radix-ui/react-icons";
import "@react-sigma/core/lib/react-sigma.min.css";
import "./styles.css";

export default function NetworkGraph() {
    const [showContents, setShowContents] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [dataset, setDataset] = useState<Dataset | null>(null);
    const [filtersState, setFiltersState] = useState<FiltersState>({
        clusters: {},
        tags: {},
    });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const sigmaSettings: Partial<Settings> = useMemo(
        () => ({
            nodeProgramClasses: {
                image: createNodeImageProgram({
                    size: { mode: "force", value: 256 },
                }),
            },
            defaultDrawNodeLabel: drawLabel,
            defaultDrawNodeHover: drawHover,
            defaultNodeType: "image",
            defaultEdgeType: "arrow",
            labelDensity: 0.07,
            labelGridCellSize: 60,
            labelRenderedSizeThreshold: 15,
            labelFont: "Lato, sans-serif",
            zIndex: true,
        }),
        []
    );

    // Load data on mount:
    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/jacomyal/sigma.js/main/packages/demo/public/dataset.json`)
            .then((res) => res.json())
            .then((dataset: Dataset) => {
                setDataset(dataset);
                setFiltersState({
                    clusters: mapValues(
                        keyBy(dataset.clusters, "key"),
                        constant(true)
                    ),
                    tags: mapValues(keyBy(dataset.tags, "key"), constant(true)),
                });
                requestAnimationFrame(() => setDataReady(true));
            });
    }, []);

    if (!dataset) return null;

    return (
            <SigmaContainer
                graph={DirectedGraph}
                settings={sigmaSettings}
            >
                <GraphSettingsController hoveredNode={hoveredNode} />
                <GraphEventsController setHoveredNode={setHoveredNode} />
                <GraphDataController dataset={dataset} filters={filtersState} />

                {dataReady && (
                    <>
                        <div className="controls">
                            <div className="react-sigma-control ico">
                                <button
                                    type="button"
                                    className="show-contents"
                                    onClick={() => setShowContents(true)}
                                    title="Show caption and description"
                                >
                                    <BookmarkFilledIcon />
                                </button>
                            </div>
                            <FullScreenControl className="ico">
                                <EnterFullScreenIcon />
                                <ExitFullScreenIcon />
                            </FullScreenControl>

                            <ZoomControl className="ico">
                                <ZoomInIcon />
                                <ZoomOutIcon />
                                <TargetIcon />
                            </ZoomControl>
                        </div>
                        <div className="contents">
                            <div className="ico">
                                <button
                                    type="button"
                                    className="ico hide-contents"
                                    onClick={() => setShowContents(false)}
                                    title="Show caption and description"
                                >
                                    <Cross1Icon />
                                </button>
                            </div>
                            <div className="panels">
                                <SearchField filters={filtersState} />
                                <DescriptionPanel />
                                <ClustersPanel
                                    clusters={dataset.clusters}
                                    filters={filtersState}
                                    setClusters={(clusters) =>
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            clusters,
                                        }))
                                    }
                                    toggleCluster={(cluster) => {
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            clusters: filters.clusters[cluster]
                                                ? omit(
                                                      filters.clusters,
                                                      cluster
                                                  )
                                                : {
                                                      ...filters.clusters,
                                                      [cluster]: true,
                                                  },
                                        }));
                                    }}
                                />
                                <TagsPanel
                                    tags={dataset.tags}
                                    filters={filtersState}
                                    setTags={(tags) =>
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            tags,
                                        }))
                                    }
                                    toggleTag={(tag) => {
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            tags: filters.tags[tag]
                                                ? omit(filters.tags, tag)
                                                : {
                                                      ...filters.tags,
                                                      [tag]: true,
                                                  },
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </SigmaContainer>
    );
}
